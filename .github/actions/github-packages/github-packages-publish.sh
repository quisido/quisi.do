set -Eeuo pipefail;

npm config set "//npm.pkg.github.com/:_authToken" $NPM_AUTH_TOKEN;
pnpm run publish --registry=https://npm.pkg.github.com;
