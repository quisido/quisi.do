# Content info

A content info landmark contains information about the parent document[^1].

Examples of information included in this region of the page are copyrights and
links to privacy statements[^1].

Do not mark more than one element on a page with the `contentinfo` role. Because
`document` and `application` elements can be nested in the DOM, they can have
multiple `contentinfo` elements as DOM descendants, assuming each of those is
associated with different `document` nodes, either by a DOM nesting (e.g.
`document` within `document`) or by use of the `aria-owns` attribute[^1].

A `contentinfo` landmark is a way to identify common information at the bottom
of each page within a website, typically called the "footer" of the page,
including information such as copyrights and links to privacy and accessibility
statements[^2].

Each page may have one `contentinfo` landmark[^2].

The `contentinfo` landmark should be a top-level landmark[^2].

When a page contains nested `document` and/or `application` roles (e.g.
typically through the use of `iframe` and `frame` elements), each `document` or
`application` role may have one `contentinfo` landmark[^2].

If a page includes more than one `contentinfo` landmark, each should have a
unique label[^2].

[^1]: https://w3c.github.io/aria/#contentinfo
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html
