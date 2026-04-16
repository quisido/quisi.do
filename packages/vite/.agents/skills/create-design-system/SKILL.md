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

<<<<<<< HEAD
## Copy the template files

From this package's root directory, execute this skill's `copy-template.sh`
script with the _slug_ as the first argument:

```bash
bash ./.agents/skills/create-design-system/copy-template.sh my-example-slug
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
shared theme file for each component to use. That would just lead to each
component looking identical.

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
=======
1. **Copy the template files:** From this package's root directory, execute this
   skill's `copy-template.sh` script with the _slug_ as the first argument, i.e.
  ```bash
  bash ./.agents/skills/create-design-system/copy-template.sh my-example-slug
  ```
2. **Test-driven development:** From this package's root directory, execute
   `npx vitest run src/design-systems/$slug.test.ts` to verify this design
   system's test suite is accurate and passing. If the test suite is failing on
   this step, stop and notify the user that something is wrong with the design
   system template's test suite.
3. **Design:** Use the name, description, and screenshot to determine useful
   _semantic_ design tokens and their values.
   - _Primary calls to action_
   - _Neutral surfaces:_ grays for backgrounds, borders, and text
   - _Functional colors:_ success green, warning yellow, error red
   - _Interactive states:_ active, disabled, focus, and hover
   - _Font families:_ display/headings, base/body text; only use fonts available
     through Google Fonts
   - _Spacing_: padding and margin considerations
   - _Border radius_: How rounded are the corners?
   - _Border width_: consistent thickness for lines and dividers
   - _Shadows_: depth, elevation
   Verify that these design tokens, when _combined_, align with the design
   system's aesthetic and visually contribute to the screenshot, if one was
   provided.
4. **Implementation:** Each _sibling_ file exported by `$slug/index.ts` is a
   component in the design system; ignore the files in `../core/`. To prevent
   context bloat, use a separate subagent to implement each component. Give the
   subagent the design system's description, optional screenshot, design tokens,
   component file, corresponding test file (`../core-test/test-$component.tsx`),
   and any additional useful context. The subagent's instructions are:
   1. Implement the design system's aesthetic for this component. You may alter
      the component's JSX in _any way_ to achieve this, but you _cannot_ install
      or import any dependencies that are not already present in the component's
      file.
   2. Combine what you already know about ARIA roles with the component's JSDoc
      comment. Determine how many DOM nodes you will need to achieve the target
      aesthetic (minimal design → less shapes → less nodes; maximal design →
      more shapes → more nodes), then adjust the JSX accordingly.
   3. Test this component for feature completeness and accessibility compliance
      by executing this command, passing the _slug_ and _component name_ as
      arguments:
      ```bash
      # Example
      bash ./.agents/skills/create-design-system/test-component.sh polaris "BlockQuote"
      ```
      If the test suite is failing, adjust your implementation until it passes.
   4. In the sibling `$component.module.scss` file, write CSS for this
      component. Use the design system's description and design token _values_
      to stylize this component to match the design system's aesthetic. _Do not_
      use the tokens themselves; they do not exist. The values are provided only
      as inspiration. Remember to be artistic and creative. If applicable to the aesthetic: add `data:` images to create textures and shapes; add
      `transform` properties so that content feels more like a hand-drawn piece
      or poster; add `box-shadow` for depth and elevation. You may re-adjust the
      JSX to accomplish your goals.
   5. Test this component again. If the test suite is failing, adjust your
      implementation until it passes.
   6. You may create as many files as you need to organize your component, but
      you _may not_ edit any files outside of the design system's `$slug/`
      directory. This especially means you cannot edit any files in `../core/`
      or `../core-test/`.
5. **Double check:** Review the design system. Does it align with the design
   system's description? Do the components look visually cohesive when used
   together? If not, make any necessary adjustments to the components'
   implementations and styles until the design system feels complete and aligned
   with its target aesthetic.
6. **Test:** Once each subagent has completed their implementation, run the test
   suite: `npx vitest run src/design-systems/$slug.test.ts`. If any tests are
   failing, adjust the implementation until all tests pass.
>>>>>>> 2b8f2b12 (add class names)
