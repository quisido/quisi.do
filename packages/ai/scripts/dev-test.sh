node ./dev-test.js | \
curl -X POST https://localhost:378 \
     -H "Authorization: Bearer d81d5a1893caa54b494264f9d27cf0cd9fb9e7599522220dee643b375fce5012" \
     -H "Content-Type: application/json" \
     --insecure \
     -d @-
