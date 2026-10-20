#!/usr/bin/env bash
# Build the landing site + blog and upload it to the droplet, where Caddy serves it at
# https://buffermint.com/ (the /tools/ path is served from the buffermint-tools repo).
# The Caddy config lives in buffermint-tools/deploy/buffermint.caddy.
# Needs PHP 8.2+, Composer, Node and Yarn.
set -euo pipefail
cd "$(dirname "$0")"
HOST=${DEPLOY_HOST:-buffermint-droplet}
DIR=/var/www/buffermint-landing
[ -d vendor ] || composer install --no-dev --no-interaction -q
[ -d node_modules ] || yarn install --silent
# webpack 4-era hashing needs the legacy OpenSSL provider on Node 17+
NODE_OPTIONS=--openssl-legacy-provider yarn run prod >/dev/null
./vendor/bin/jigsaw build production 2>/dev/null | tail -1
# /admin is Netlify CMS: it needs Netlify Identity, so it cannot work on the droplet
ssh "$HOST" "mkdir -p $DIR"
rsync -az --delete --exclude admin/ build_production/ "$HOST:$DIR/"
ssh "$HOST" "chown -R root:root $DIR && chmod -R u=rwX,go=rX $DIR"
echo "Uploaded to $HOST:$DIR (served at https://buffermint.com/)"
