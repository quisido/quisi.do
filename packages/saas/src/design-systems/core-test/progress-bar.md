- Set `aria-valuemin` and `aria-valuemax` to indicate the minimum and maximum
  progress indicator values[^1].
- `aria-valuemin` defaults to 0 (zero)[^1].
- `aria-valuemax` defaults to 100[^1].
- Supply a value for `aria-valuenow` unless the value is indeterminate, in which
  case omit the `aria-valuenow` attribute[^1].
- If the progress bar is describing the loading progress of a particular region
  of a page, both use `aria-describedby` to reference the progress bar status,
  and set the `aria-busy` attribute to `true` on the region until it is finished
  loading[^1].
- It is not possible for the user to alter the value of a progress bar because
  it is always read-only[^1].

[^1]: https://w3c.github.io/aria/#progressbar
