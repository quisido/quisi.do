set -Eeuo pipefail;

npm config set "//npm.pkg.github.com/:_authToken" $NPM_AUTH_TOKEN;
npm publish --registry=https://npm.pkg.github.com;
