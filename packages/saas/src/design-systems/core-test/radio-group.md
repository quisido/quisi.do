- Enforce that only one radio button in a group can be checked at the same time.
  When one item in the group is checked, the previously checked item becomes
  unchecked (its `aria-checked` attribute becomes `false`)[^1].
- Provide an accessible name for a radio group, which can be done with the
  `aria-label` or `aria-labelledby` attribute[^1].

[^1]: <https://w3c.github.io/aria/#radiogroup>
