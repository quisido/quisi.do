set -Eeuo pipefail;

npm config set "//registry.npmjs.org/:_authToken" $NPM_AUTH_TOKEN;
npm run publish;
