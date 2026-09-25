- A static separator exposes a structural `separator` role, is not focusable,
  and has no widget value attributes[^1].
- A static separator defaults to horizontal and can expose vertical
  orientation[^1].
- A focusable separator widget exposes its accessible name, orientation,
  current value, and minimum and maximum values[^1].
- A separator widget defaults its range to 0 through 100, rejects values outside
  its range, and can expose human-readable `aria-valuetext`[^1].
- Directional keys change the value according to orientation and do not move it
  outside its configured range[^2].
- A disabled separator widget exposes its disabled state, leaves the page
  `Tab` sequence, and does not change value[^2].

[^1]: https://w3c.github.io/aria/#separator

[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
