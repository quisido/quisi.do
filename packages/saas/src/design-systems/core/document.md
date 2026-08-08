# Document

A document is an element containing content that assistive technology users
might want to browse in a reading mode[^1].

Because assistive technologies that have a reading mode default to that mode for
all elements except for widgets and [applications](./application.md), the only
circumstance where a document is useful for changing assistive technology
behavior is when the document is a focusable accessibility child of a widget or
application. For example, given an application which contains some static rich
text, you can contain the text in a document and give it a `tabindex` of `0`.
When a screen reader user presses the Tab key and places focus on the document,
the user will be able to read the text with the screen reader's reading
cursor[^1].

[^1]: https://w3c.github.io/aria/#document
