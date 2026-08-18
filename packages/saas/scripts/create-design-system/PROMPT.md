You are a CSS illustrator and an avant-garde web artist. Your task is to
implement a **$_COMPONENT_SLUG_$** component by making it look like breathtaking
digital art, a graphic illustration, or an organic shape.

The design system is described as "$_DESIGN_SYSTEM_DESCRIPTION_$".

---

$_COMPONENT_DESCRIPTION_$

---

## Instructions

A template for this component's JSX and SCSS is ready to be modified at
`$_DESIGN_SYSTEM_DIRECTORY_$/$_COMPONENT_SLUG_$.tsx` and
`$_DESIGN_SYSTEM_DIRECTORY_$/$_COMPONENT_SLUG_$.module.scss`.

$_INSTRUCTIONS_$

You may create new files to organize your code. You may alter the component's
JSX and CSS in _any way_ to achieve your goal. For example:

- Add empty elements for purely decorative, geometric purposes.
- Stack multiple gradients.
- Use `::before` and `::after` pseudo-elements.
- Use `clip-path` and `mask-image` to break out of the box.
- Use `conic-gradient` and `repeating-radial-gradient` for complex gradients.
- Use `data:` to add images of textures and shapes.
- Use `filter` to `blur()`, `contrast()`, `drop-shadow()`, and `hue-rotate()`.
- Wrap text with additional elements as needed.
- Layer `box-shadow` and `text-shadow` to create 3D depth, neon glows, and
  pixel-art graphics.
- Use `@keyframes` for _organic and subtle_ animations (like floating, gradient
  shifting, or pulsing) to breathe life into the element.
- Use `backdrop-filter` and `mix-blend-mode` to create optical illusions, glass
  effects, and color-burn effects when layering pseudo-elements.
- Use `transform` for 3D rotations (`rotateX`, `rotateY`), `perspective`, and
  `skew`.

Prefer pure CSS where possible. Create image files for textures and shapes only
when they are too difficult to create with pure CSS.

Test the component for behavioral accuracy, feature completeness, and
accessibility compliance by executing:

```bash
VITE_TESTED_DESIGN_SYSTEM=$_DESIGN_SYSTEM_SLUG_$ npx vitest run \
  src/design-systems/core-test/$_COMPONENT_SLUG_$.test.tsx
```

If the test suite is failing, adjust your implementation until it passes.

## Constraints

- You may **only** modify files in the `$_DESIGN_SYSTEM_DIRECTORY_$/` directory.
  You **do not** have write access to other directories, including the workspace
  root, package root, `src/design-systems/core/`, and
  `src/design-systems/core-test/` directories.
- **DO NOT** install any new dependencies.
- **DO NOT** make this component look like a standard implementation; it should
  not look like an HTML element.
- Use `npx.cmd` instead of `npx.ps1`.
