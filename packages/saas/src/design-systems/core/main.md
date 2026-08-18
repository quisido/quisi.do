# Main

A main landmark contains the main content of a document[^1].

This marks the content that is directly related to or expands upon the central
topic of the document. The main role is a non-obtrusive alternative for "skip to
main content" links, where the navigation option to go to the main content (or
other landmarks) is provided by assistive technologies, or by a user agent or
browser extension, through a keyboard shortcut or UI feature such as a side
panel or dialog[^1].

Do not use more than one main component on a page[^1].

Because documents and applications can be nested in the DOM, they can have
multiple main elements as DOM descendants, assuming each of those is associated
with different documents, either by a DOM nesting (e.g. document within
document) or by use of the `aria-owns` attribute.

[^1]: https://w3c.github.io/aria/#main
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html
