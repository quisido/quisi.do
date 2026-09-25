# Managing Focus

When using standard HTML interactive elements and simple WAI-ARIA widgets,
application developers can manipulate the tab order or associate keyboard
shortcuts with elements in the document[^1].

WAI-ARIA includes a number of "managing container" widgets, also known as
"composite" widgets. When appropriate, the container is responsible for tracking
the last descendant that was active (the default is usually the first item in
the container). It is essential that a container maintain a usable and
consistent strategy when focus leaves a container and is then later refocused.
While there can be exceptions, it is recommended that when a previously focused
container is refocused, the active descendant be the same element as the active
descendant when the container was last focused. Exceptions include cases where
the contents of a container widget have changed, and widgets like a menubar
where the user expects to always return to the first item when focus leaves the
menu bar. For example, if the second item of a tree group was the active
descendant when the user tabbed out of the tree group, then the second item of
the tree group remains the active descendant when the tree group gets focus
again. The user can also activate the container by clicking on one of the
descendants within it. When the container or its active descendant has focus,
the user can navigate through the container by pressing additional keys, such as
the arrow keys, to change the currently active descendant. Any additional press
of the main navigation key (generally the TAB key) will move out of the
container to the next widget[^1].

Usable keyboard navigation in a rich internet application is different from the
tabbing paradigm among interactive elements, such as links and form controls, in
a static document. In rich internet applications, the user tabs to significantly
complex widgets, such as a menu or spreadsheet, and uses the arrow keys to
navigate within the widget. The changes that WAI-ARIA introduces to keyboard
navigation make this enhanced accessibility possible. In WAI-ARIA, any element
can be keyboard focusable. In addition to host language mechanisms such as
`tabindex`, `aria-activedescendant` provides another mechanism for keyboard
operation. Most other aspects of WAI-ARIA widget development depend on keyboard
navigation functioning properly[^1].

If you remove the element with focus, move focus to a logical element.
Similarly, do not scroll the element with focus off screen unless the user
performed a scrolling action[^1].

Ensure that all interactive elements are focusable and that all parts of
composite widgets are either focusable or have a documented alternative method
to achieve their function[^1].

Use `aria-activedescendant` to inform assistive technologies which descendant of
a widget element is treated as having keyboard focus in the user interface if
the role of the widget element supports `aria-activedescendant`. This is often a
more convenient way of providing keyboard navigation within widgets where the
widget occupies only one stop in the page Tab sequence and other keys, typically
arrow keys, are used to focus elements inside the widget[^1].

Use `tabindex="0"` to put the widget in the Tab sequence and
`aria-activedescendant` to point to the ID of the currently active descendant.
You are responsible for styling the currently active descendant to show it has
keyboard focus. You cannot use `:focus` to style the currently active descendant
since the actual focus is on the container[^1].

More information on managing focus can be found in the
[Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
section of the WAI-ARIA Authoring Practices.

[^1]: https://w3c.github.io/aria/#managingfocus
