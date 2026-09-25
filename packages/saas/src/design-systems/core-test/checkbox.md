- The checkbox has role checkbox[^1].
- The checkbox has an accessible label provided by one of the following[^1]:
  - Visible text content contained within the element with role checkbox.
  - A visible label referenced by the value of `aria-labelledby` set on the
    element with role checkbox.
  - `aria-label` set on the element with role checkbox.
- When checked, the checkbox has state `aria-checked` set to `true`[^1].
- When not checked, it has state `aria-checked` set to `false`[^1].
- When partially checked, it has state `aria-checked` set to `mixed`[^1].
- If a set of checkboxes is presented as a logical group with a visible label,
  the checkboxes are included in an element with role `group` that has the
  property `aria-labelledby` set to the ID of the element containing the
  label[^1].
- If the presentation includes additional descriptive static text relevant to a
  checkbox or checkbox group, the checkbox or checkbox group has the property
  `aria-describedby` set to the ID of the element containing the
  description[^1].

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
