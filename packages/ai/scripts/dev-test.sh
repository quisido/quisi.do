node ./dev-test.js | \
curl -X POST https://localhost:378 \
     -H "Authorization: Bearer TEST_PLACEHOLDER_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     --insecure \
     -d @-
