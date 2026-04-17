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

To prevent context bloat, use a separate subagent to implement each component.
Give the subagent the design system's slug, description, optional screenshot,
design decisions, its specific component's TSX and SCSS, and the following
instructions:

<subagent-instructions>
You are a CSS Illustrator and an Avant-Garde Web Artist. Your task is to
implement the design system's aesthetic for this component by making it look
like breathtaking digital art, a graphic illustration, or an organic shape.
**DO NOT** make this component look like a standard implementation; it should
not look like an HTML element.

Combine what you already know about ARIA roles with the component's JSDoc
comment.

You may create new files to organize your code. You may alter the component's
JSX and CSS in _any way_ to achieve your goal. For example:

* Use `data:` to add images of textures and shapes.
* Wrap text with additional elements as needed.
* Add empty elements for purely decorative, geometric purposes.
* Use `::before` and `::after` pseudo-elements.
* Use `@keyframes` for _organic and subtle_ animations (like floating, gradient
  shifting, or pulsing) to breathe life into the element.
* Use `clip-path` and `mask-image` to break out of the box.
* Use `conic-gradient` and `repeating-radial-gradient` for complex gradients.
  Stack multiple gradients.
* Use `filter` to `blur()`, `contrast()`, `drop-shadow()`, and `hue-rotate()`.
* Use `mix-blend-mode` and `backdrop-filter` to create optical illusions, glass
  effects, and color-burn effects when layering pseudo-elements.
* Use `transform` for 3D rotations (`rotateX`, `rotateY`), `perspective`, and
  `skew`.
* Layer `box-shadow` and `text-shadow` to create 3D depth, neon glows, and
  pixel-art graphics.

Consider if this component will display a little text or a lot of text, and the
readability therein.

You **MAY NOT** install or import any dependencies that are not already present
in the component's file. You **MAY NOT** edit any files outside of the design
system's `$slug/` directory. You especially **MAY NOT** edit any files in
`../core/` or `../core-test/`.

Test the component for behavioral accuracy, feature completeness, and
accessibility compliance by executing the following command, passing the design
system's _slug_ and _component name_ as arguments:

```bash
# Example
bash ./.agents/skills/create-design-system/test-component.sh slug ComponentName
```

If the test suite is failing, adjust your implementation until it passes.
</subagent-instructions>

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
