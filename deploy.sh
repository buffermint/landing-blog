#!/usr/bin/env bash
# Build the landing site + blog and publish it to https://buffermint.com/ on Cloudflare Pages
# (../buffermint-pages/publish.sh, which adds the /tools/ build from the buffermint-tools repo).
# A copy also goes to the VPS (buffermint-vps) as a fallback and as the source publish.sh reads.
# Needs PHP 8.2+, Composer, Node 20+ (see .nvmrc) and Yarn 1.
set -euo pipefail
cd "$(dirname "$0")"
HOST=${DEPLOY_HOST:-root@buffermint-vps}
# On buffermint-vps itself (the bm-publish wrapper exists) everything is local: no ssh, root-owned wrappers instead of root
[ -x /usr/local/sbin/bm-publish ] && ON_VPS=1 || ON_VPS=
[ -n "$ON_VPS" ] || [ "${ALLOW_MAC_DEPLOY:-}" = 1 ] || { echo "Deploys run on buffermint-vps since 2026-10-23: ssh buffermint-agent, then cd /srv/buffermint/buffermint-landing. (ALLOW_MAC_DEPLOY=1 overrides, for emergencies only.)"; exit 1; }
DIR=/var/www/buffermint-landing
# deploy only committed work (ALLOW_DIRTY=1 to override, e.g. while testing)
if [ -z "${ALLOW_DIRTY:-}" ] && [ -n "$(git status --porcelain --ignore-submodules=none)" ]; then
  echo "Uncommitted changes: commit them first (or ALLOW_DIRTY=1 ./deploy.sh)."; exit 1
fi
[ -f brand/dist/brand.json ] || git submodule update --init brand
[ -d vendor ] || composer install --no-dev --no-interaction -q
[ -d node_modules ] || yarn install --silent
yarn run prod >/dev/null
./vendor/bin/jigsaw build production 2>/dev/null | tail -1
# SEO gate (shared with the tools site): titles, descriptions, canonicals, OG, JSON-LD, links, sitemap
node brand/scripts/seo-check.mjs --dir build_production --site https://buffermint.com --skip /tools/,/stats/
if [ -n "$ON_VPS" ]; then rsync -a --delete build_production/ "$DIR/" && chmod -R u=rwX,go=rX "$DIR"
else
ssh "$HOST" "mkdir -p $DIR"
rsync -az --delete build_production/ "$HOST:$DIR/"
ssh "$HOST" "chown -R root:root $DIR && chmod -R u=rwX,go=rX $DIR"
fi
echo "Uploaded to $([ -n "$ON_VPS" ] && echo "$DIR" || echo "$HOST:$DIR") (fallback copy; also the source publish.sh reads when the tools deploy)"
# buffermint.com is served by Cloudflare Pages: publish this build together with the live /tools/ build
LANDING="$PWD/build_production" ../buffermint-pages/publish.sh
# tell IndexNow search engines (Bing, Yandex, …) which pages changed; never fails the deploy
node brand/scripts/indexnow.mjs --dir build_production --site https://buffermint.com || true
