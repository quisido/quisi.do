- Set the `aria-controls` attribute on the scrollbar element to reference the
  scrollable area it controls[^1].
- Set `aria-valuemin` and `aria-valuemax` to indicate the minimum and maximum
  thumb position[^1].
- `aria-valuemin` defaults to 0 (zero)[^1].
- `aria-valuemax` defaults to 100[^1].
- Set the `aria-valuenow` attribute to indicate the current thumb position[^1].
- Scrollbars have an implicit `aria-orientation` value of `'vertical'`[^1].

[^1]: https://w3c.github.io/aria/#scrollbar
