---
name: create-design-system
description: Use this skill to create a new design system.
---

# Instructions for creating a design system

Before getting started, you need to know:
- The "slug" for the design system. It should be short, alphanumeric, lowercase,
  and use hyphens instead of spaces.
- The "description" of the design system. It should be a few sentences long and
  packed with artistic keywords that inspire the design system's aesthetic.
- (Optional) A screenshot to use as a visual reference.

## Copy the template files

From this package's root directory, execute:

```sh
# If there is no screenshot,
bun ./scripts/create-design-system.ts "$SLUG" "$DESCRIPTION";

# If there is a screenshot,
bun ./scripts/create-design-system.ts \
  "$SLUG" \
  "$DESCRIPTION" \
  "./path/to/screenshot.png";
```

```bash
SLUG=my-example-slug
cp --no-clobber --one-file-system --preserve --recursive \
  "./src/design-systems/template/." \
  "./src/design-systems/$SLUG/";
```

## Components

For each component, use a subagent to generate the design and implement the
component. A subagent's fresh context will prevent it from reusing another
component's design.

Each component has an associated markdown file that outlines its uses and
behaviors (located in `src/design-systems/core/`), a unit test that enforces the
component's behavioral contract (located in `src/design-system/core-test/`), and
a template implementation (located in `src/design-systems/$SLUG$/`) that's ready
to be modified.

In some instances, one or more example screenshots are provided (in
`src/design-systems/$SLUG$/`). When this screenshot is present, the subagent
should start by using the design system's description to create an artistic
variation of the image, replacing the placeholder screenshot.

If an image variant was rendered, the subagent should implement the JSX and SCSS
to match the image variant; otherwise, the subagent should implement the JSX and
SCSS to match the design system's description. It should prefer pure CSS, but
the subagent may create image files for textures and shapes too difficult to
create with pure CSS.

The subagent **must not** modify the files in `src/design-systems/core/` or
`src/design-system/core-test/`. It should only modify the files in
`src/design-systems/$SLUG$/`.

The components are:

| Component | Description | Template JSX | Template SCSS | Screenshot |
|-----------|-------------|--------------|---------------|------------|
| Alert | `alert.md` | `alert.tsx` | `alert.module.scss` | `alert.png` |
| Alert Dialog | `alert-dialog.md` | `alert-dialog.tsx` | `alert-dialog.module.scss` | `alert-dialog.png` |
| Application | `application.md` | `application.tsx` | `application.module.scss` | - |
| Article | `article.md` | `article.tsx` | `article.module.scss` | - |
| Banner | `banner.md` | `banner.tsx` | `banner.module.scss` | `banner.png` |
| Block Quote | `block-quote.md` | `block-quote.tsx` | `block-quote.module.scss` | - |
| Button | `button.md` | `button.tsx` | `button.module.scss` | `button.png` |
| Checkbox | `checkbox.md` | `checkbox.tsx` | `checkbox.module.scss` | `checkbox.png` |
| Code | `code.md` | `code.tsx` | `code.module.scss` | `code.png` |
| Combobox | `combobox.md` | `combobox.tsx` | `combobox.module.scss` | `combobox.png` |
| Comment | `comment.md` | `comment.tsx` | `comment.module.scss` | - |
| Complementary | `complementary.md` | `complementary.tsx` | `complementary.module.scss` | - |
| Content Info | `content-info.md` | `content-info.tsx` | `content-info.module.scss` | - |
| Definition | `definition.md` | `definition.tsx` | `definition.module.scss` | - |
| Dialog | `dialog.md` | `dialog.tsx` | `dialog.module.scss` | - |
| Document | `document.md` | `document.tsx` | `document.module.scss` | - |
| Emphasis | `emphasis.md` | `emphasis.tsx` | `emphasis.module.scss` | - |
| Feed | `feed.md` | `feed.tsx` | `feed.module.scss` | - |
| Figure | `figure.md` | `figure.tsx` | `figure.module.scss` | - |
| Form | `form.md` | `form.tsx` | `form.module.scss` | - |
| Grid | `grid.md` | `grid.tsx` | `grid.module.scss` | - |
| Heading | `heading.md` | `heading.tsx` | `heading.module.scss` | `heading.png` |
| Image | `image.md` | `image.tsx` | `image.module.scss` | - |
| Link | `link.md` | `link.tsx` | `link.module.scss` | `link.png` |
| List | `list.md` | `list.tsx` | `list.module.scss` | - |
| List Box | `list-box.md` | `list-box.tsx` | `list-box.module.scss` | - |
| Log | `log.md` | `log.tsx` | `log.module.scss` | - |
| Main | `main.md` | `main.tsx` | `main.module.scss` | - |
| Mark | `mark.md` | `mark.tsx` | `mark.module.scss` | - |
| Marquee | `marquee.md` | `marquee.tsx` | `marquee.module.scss` | - |
| Math | `math.md` | `math.tsx` | `math.module.scss` | - |
| Menu | `menu.md` | `menu.tsx` | `menu.module.scss` | `menu.png` |
| Menu Bar | `menu-bar.md` | `menu-bar.tsx` | `menu-bar.module.scss` | - |
| Meter | `meter.md` | `meter.tsx` | `meter.module.scss` | `meter.png` |
| Navigation | `navigation.md` | `navigation.tsx` | `navigation.module.scss` | - |
| Note | `note.md` | `note.tsx` | `note.module.scss` | - |
| Paragraph | `paragraph.md` | `paragraph.tsx` | `paragraph.module.scss` | - |
| Progress Bar | `progress-bar.md` | `progress-bar.tsx` | `progress-bar.module.scss` | `progress-bar.png` |
| Radio Group | `radio-group.md` | `radio-group.tsx` | `radio-group.module.scss` | `radio-group.png` |
| Region | `region.md` | `region.tsx` | `region.module.scss` | - |
| Scrollbar | `scrollbar.md` | `scrollbar.tsx` | `scrollbar.module.scss` | - |
| Search | `search.md` | `search.tsx` | `search.module.scss` | - |
| Search Box | `search-box.md` | `search-box.tsx` | `search-box.module.scss` | `search-box.png` |
| Separator | `separator.md` | `separator.tsx` | `separator.module.scss` | `separator.png` |
| Separator Widget | `separator-widget.md` | `separator-widget.tsx` | `separator-widget.module.scss` | - |
| Slider | `slider.md` | `slider.tsx` | `slider.module.scss` | `slider.png` |
| Spin Button | `spin-button.md` | `spin-button.tsx` | `spin-button.module.scss` | - |
| Status | `status.md` | `status.tsx` | `status.module.scss` | - |
| Strong | `strong.md` | `strong.tsx` | `strong.module.scss` | - |
| Subscript | `subscript.md` | `subscript.tsx` | `subscript.module.scss` | - |
| Suggestion | `suggestion.md` | `suggestion.tsx` | `suggestion.module.scss` | - |
| Superscript | `superscript.md` | `superscript.tsx` | `superscript.module.scss` | - |
| Switch | `switch.md` | `switch.tsx` | `switch.module.scss` | `switch.png` |
| Table | `table.md` | `table.tsx` | `table.module.scss` | `table.png` |
| Tabs | `tabs.md` | `tabs.tsx` | `tabs.module.scss` | `tabs.png` |
| Term | `term.md` | `term.tsx` | `term.module.scss` | - |
| Text Box | `text-box.md` | `text-box.tsx` | `text-box.module.scss` | `text-box.png` and `text-box-multiline.png` |
| Time | `time.md` | `time.tsx` | `time.module.scss` | - |
| Timer | `timer.md` | `timer.tsx` | `timer.module.scss` | - |
| Toggle Button | `toggle-button.md` | `toggle-button.tsx` | `toggle-button.module.scss` | - |
| Toolbar | `toolbar.md` | `toolbar.tsx` | `toolbar.module.scss` | - |
| Tooltip | `tooltip.md` | `tooltip.tsx` | `tooltip.module.scss` | `tooltip.png` |
| Tree | `tree.md` | `tree.tsx` | `tree.module.scss` | `tree.png` |
| Tree Grid | `tree-grid.md` | `tree-grid.tsx` | `tree-grid.module.scss` | - |

## Test

Run the design system's test suite with
`VITE_TESTED_DESIGN_SYSTEM=$SLUG npx vitest run src/design-systems/core-test/`.
If any tests are failing, adjust the implementation until all tests pass.
