---
name: css
description: Use these CSS guidelines when editing or reviewing CSS or SASS stylesheets.
license: MIT
user-invocable: false
metadata:
  author: quisi.do
---

# CSS guidelines

## Constraints

- **Do not** use the `rotate` or `translate` properties. These can negatively
  impact performance during animations.
  - Use `transform: rotate(...)` and `transform: translate(...)` instead.
