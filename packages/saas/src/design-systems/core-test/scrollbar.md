- Set the `aria-controls` attribute on the scrollbar element to reference the
  scrollable area it controls.
- Set `aria-valuemin` and `aria-valuemax` to indicate the minimum and maximum
  thumb position.
- `aria-valuemin` defaults to 0 (zero).
- `aria-valuemax` defaults to 100.
- Set the `aria-valuenow` attribute to indicate the current thumb position.
- Scrollbars have an implicit `aria-orientation` value of `'vertical'`.

[^1]: https://w3c.github.io/aria/#scrollbar
