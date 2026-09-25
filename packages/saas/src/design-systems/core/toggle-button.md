# Toggle button

A toggle button is a two-state button that can be either off (not pressed) or on
(pressed). For example, a button labelled mute in an audio player could indicate
that sound is muted by setting the pressed state true[^2].

**Important:** the label on a toggle does not change when its state changes[^2].
For example, when the pressed state is `true`, the label remains "Mute" so a
screen reader would say something like "Mute toggle button pressed". If the
design calls for the button label to change from "Mute" to "Unmute," do not use
a toggle button or the `aria-pressed` attribute.

[^1]: https://w3c.github.io/aria/#togglebutton
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/button/
