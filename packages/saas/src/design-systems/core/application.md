# Application

An application contains one or more focusable elements that require user input,
such as keyboard or gesture events, that do not follow a standard interaction
pattern supported by a widget role[^1].

When there is a need to create an element with an interaction model that is not
supported by any of the WAI-ARIA widget roles, use an application[^1].

For example, a presentation slide editor uses arrow keys to change the positions
of textbox and image elements on the slide. There are not any WAI-ARIA widget
roles that correspond to such an interaction model so you should use an
application for the slide container, an `aria-roledescription` of "Slide
Editor", and `aria-describedby` to provide instructions[^1].

Because only the focusable elements contained in an application element are
accessible to users of some assistive technologies, you must use one of the
following techniques to ensure all non-decorative static text or image content
inside an application is accessible:

- Associate the content with a focusable element using `aria-labelledby` or
  `aria-describedby`.
- Place the content in a focusable element that has role `document` or
  `article`.
- Manage focus of accessibility descendants as described in
  [Managing Focus](./managing-focus.md), updating the value of
  `aria-activedescendant` to reference the element containing the focused
  content.

[^1]: https://w3c.github.io/aria/#application
