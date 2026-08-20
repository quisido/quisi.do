- The component exposes a numerical elapsed-time or remaining-time counter
  through the `timer` role[^1].
- Its text content is the current measurement and need not be machine
  parsable[^1].
- The displayed measurement can remain unchanged while paused and after the
  timer reaches an endpoint[^1].
- Timer updates do not interrupt the user; the role's implicit `aria-live`
  value is `off`[^1].

[^1]: https://w3c.github.io/aria/#timer
