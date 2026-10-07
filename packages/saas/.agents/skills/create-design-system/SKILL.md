---
name: create-design-system
description: Use this skill to create every component in a design system. Do not use it for single components.
---

# Instructions for creating a design system

This skill is for creating every component in a design system.
**Do not use this skill to create only a single component.**

Before getting started, you need to know:

- The "slug" for the design system. It should be short, alphanumeric, lowercase,
  and use hyphens instead of spaces.
- The "description" of the design system. You should know at least a few
  sentences packed with artistic keywords that inspire the design system's
  aesthetic. If you do not have enough information, prompt for more details.
- (Optional) A screenshot to use as a visual reference.

## Execute

From this package's root directory, execute:

```sh
# If there is no screenshot,
bun ./scripts/create-design-system.ts terra "$SLUG" "$DESCRIPTION";

# If there is a screenshot,
bun ./scripts/create-design-system.ts \
  terra \
  "$SLUG" \
  "$DESCRIPTION" \
  "./path/to/screenshot.png";
```

Once the `create-design-system.ts` script has finished creating each component:

- Update `./src/design-systems/${SLUG}/index.ts` to set the design system's name
  to a title case variant of the slug, capitalizing each word and replacing
  hyphens with spaces:

  ```ts
  export const name = "Title Case Name";
  ```
- Update `./src/design-systems/${SLUG}/README.md` with the design system's
  description and test script.
