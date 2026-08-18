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

## Execute

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
