cp --no-clobber --one-file-system --preserve --recursive \
  "./src/design-systems/template/." \
  "./src/design-systems/$1/";
cp --no-clobber --one-file-system --preserve \
  "./src/design-systems/template.test.ts" \
  "./src/design-systems/$1.test.ts";
sed --in-place \
  "s/template/$1/g" \
  "./src/design-systems/$1.test.ts";
