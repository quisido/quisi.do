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

From this package's root directory, execute the `design-system:copy-template`
script, passing the _slug_ as an argument.

```bash
npm run design-system:copy-template my-example-slug
```

## Test-driven development

From this package's root directory, execute
`npx vitest run src/design-systems/$slug.test.ts` to verify the new design
system files' test suite is accurate and passing. If the test suite is failing
on this step, stop and notify the user that something is wrong with the design
system template's test suite.

## Design decisions

Use the provided description and screenshot to determine useful _semantic_
design tokens and their values. Create as many or as few as you need.

**Considerations:**
- _Primary colors_ for calls to action
- _Accent colors_ for highlights and emphasis
- _Font families_ for sans-serif display text (headings) and serif base text
  (body); only use font families from Google Fonts
- Should the _border radius_ be soft or sharp?
- Should the _border widths_ be thick or thin?
- Should the _box shadows_ be elevated low or high?
- Should the _padding_ be spacious or dense?

## Implementation

Components in the design system are located at `src/design-systems/$slug/*.tsx`
and their CSS files are co-located at `src/design-systems/$slug/*.module.scss`.

_Do not_ look at other design systems in the repository, and **do not** create a
shared theme file for each component to use. That would lead to each component
looking identical.

To prevent context bloat, use a separate subagent to implement each component.
Give the subagent the design system's slug, description, optional screenshot,
design decisions, its specific component's TSX and SCSS, and the instructions
listed in this skill's sibling `SUBAGENT_INSTRUCTIONS.md` file.

## Validate

Once all components are implemented, review them holistically. Does the design
system align with the original description? Do the components look visually
cohesive when used together? If not, make any necessary adjustments.

## Test

As a final check, run the design system's test suite. If any tests are failing,
adjust the implementation until all tests pass.

```bash
npx vitest run src/design-systems/$slug.test.ts
```
