- Create a spin button with accessibility children, but limit those elements to
  a text box and/or two buttons. Alternatively, apply the spin button role to a
  text input and create sibling buttons to support the increment and decrement
  functions[^1].
- Descendants must have their focus managed[^1].
- When a spin button receives focus, ensure focus is placed on the textbox
  element if one is present, and on the spin button itself otherwise[^1].
- The up and down arrows on a keyboard perform the increment and decrement
  functions[^1].
- The increment and decrement button elements are mpt included in the primary
  navigation ring, e.g., the Tab ring in HTML[^1].
- Set the `aria-valuenow` attribute when the spin button has a value[^1].
- Set the `aria-valuemin` attribute when there is a minimum value, and the
  `aria-valuemax` attribute when there is a maximum value[^1].

[^1]: https://w3c.github.io/aria/#spinbutton
[^2]: https://aria-at.w3.org/report/163676
