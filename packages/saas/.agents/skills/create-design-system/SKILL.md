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

### Alert

TODO

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

### Application

TODO

### Article

TODO

### Banner

TODO

### Block quote

TODO

### Button

TODO

### Checkbox

TODO

### Code

TODO

### Combobox

TODO

### Comment

TODO

### Complementary

TODO

### Content info

TODO

### Definition

TODO

### Dialog

TODO

### Document

TODO

### Emphasis

TODO

### Feed

TODO

### Figure

TODO

### Form

TODO

### Grid

TODO

### Heading

TODO

### Image

TODO

### Link

TODO

### List

TODO

### List box

TODO

### Log

TODO

### Main

TODO

### Mark

TODO

### Marquee

TODO

### Math

TODO

### Menu

TODO

### Menu bar

TODO

### Meter

TODO

### Navigation

TODO

### Note

TODO

### Paragraph

TODO

### Progress bar

TODO

### Radio group

TODO

### Region

TODO

### Scrollbar

TODO

### Search

TODO

### Search box

TODO

### Separator

TODO

### Separator widget

TODO

### Slider

TODO

### Spin button

TODO

### Status

TODO

### Strong

TODO

### Subscript

TODO

### Suggestion

TODO

### Superscript

TODO

### Switch

TODO

### Table

TODO

### Tabs

TODO

### Turn

TODO

### Text box

TODO

### Time

TODO

### Timer

TODO

### Toggle button

TODO

### Toolbar

TODO

### Tooltip

TODO

### Tree

TODO

### Tree grid

TODO

## Test

Run the design system's test suite with
`VITE_TESTED_DESIGN_SYSTEM=$SLUG npx vitest run src/design-systems/core-test/`.
If any tests are failing, adjust the implementation until all tests pass.
