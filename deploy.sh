#!/usr/bin/env bash
# Build the landing site + blog and upload it to the droplet, where Caddy serves it at
# https://buffermint.com/ (the /tools/ path is served from the buffermint-tools repo).
# The Caddy config lives in buffermint-tools/deploy/buffermint.caddy.
# Needs PHP 8.2+, Composer, Node 20+ (see .nvmrc) and Yarn 1.
set -euo pipefail
cd "$(dirname "$0")"
HOST=${DEPLOY_HOST:-buffermint-droplet}
DIR=/var/www/buffermint-landing
[ -d vendor ] || composer install --no-dev --no-interaction -q
[ -d node_modules ] || yarn install --silent
yarn run prod >/dev/null
./vendor/bin/jigsaw build production 2>/dev/null | tail -1
ssh "$HOST" "mkdir -p $DIR"
rsync -az --delete build_production/ "$HOST:$DIR/"
ssh "$HOST" "chown -R root:root $DIR && chmod -R u=rwX,go=rX $DIR"
echo "Uploaded to $HOST:$DIR (served at https://buffermint.com/)"
