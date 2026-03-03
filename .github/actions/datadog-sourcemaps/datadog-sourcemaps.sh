set -Eeuo pipefail;

npx datadog-ci sourcemaps upload _site \
  --minified-path-prefix=https://quisi.do/_site \
  --release-version=$RELEASE_VERSION \
  --service=quisi.do \
  --workspace=packages/vite;
