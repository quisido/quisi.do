---
name: create-design-system
description: Use this skill to create a new design system.
---

# Instructions for creating a design system

Before getting started, you need to know:
- The "description" of the design system. It should be a few sentences long and
  packed with artistic keywords that inspire the design system's aesthetic.
- The "slug" for the design system. It should be short, alphanumeric, lowercase,
  and use hyphens instead of spaces.
- (Optional) A screenshot to use as a visual reference.

## Copy the template files

From this package's root directory, define the `SLUG` environment variable and
execute this script.

```bash
SLUG=my-example-slug
cp --no-clobber --one-file-system --preserve --recursive \
  "./src/design-systems/template/." \
  "./src/design-systems/$SLUG/";
```

## Components

For now, the alert dialog is the only component being implemented.

### Alert Dialog

Use a subagent to generate the design:

- From this package's root directory, open the
  `src/design-systems/$SLUG/alert-dialog.png` file to see a placeholder
  screenshot of an alert dialog.
- Use the design system's description to create an artistic variant of the
  image. Remember: An alert dialog is floating, so visually enclose it.
- Replace the placeholder image.

Use a subagent to implement the component:
- Use `src/design-systems/$SLUG/alert-dialog.png` as a reference.
- Implement `src/design-systems/$SLUG/alert-dialog.tsx` and
  `src/design-systems/$SLUG/alert-dialog.module.scss` to match the image.
- You may create image files for textures and shapes too difficult to create
  with pure CSS.

## Test

Run the design system's test suite with
`VITE_TESTED_DESIGN_SYSTEM=$SLUG npx vitest run src/design-systems/core-test/`.
If any tests are failing, adjust the implementation until all tests pass.
