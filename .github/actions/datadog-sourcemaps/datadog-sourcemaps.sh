set -Eeuo pipefail;

npx --workspace=packages/saas \
  datadog-ci sourcemaps upload _site \
  --minified-path-prefix=https://quisi.do/_site \
  --release-version=$RELEASE_VERSION \
  --service=quisi.do;
