# Banner

A banner contains mostly site-oriented content, rather than page-specific
content[^1].

Site-oriented content typically includes things such as the logo or identity of
the site sponsor, and a site-specific search tool. A banner usually appears at
the top of the page and typically spans the full width[^1].

Mark no more than one element on a page with the banner role[^1].

Because document and application elements can be nested in the DOM, they can
have multiple banner elements as DOM descendants, assuming each of those is
associated with different document nodes, either by a DOM nesting (e.g. document
within document) or by use of the `aria-owns` attribute[^1].

Each page may have one banner landmark. The banner should be a top-level
landmark. When a page contains nested `document` and/or `application` roles
(e.g. typically through the use of `iframe` and `frame` elements), each
`document` or `application` role may have one banner landmark. If a page
includes more than one `banner` landmark, each should have a unique label[^2].

The HTML `header` element defines a `banner` landmark when its context is the
body element. The HTML `header` element is not considered a `banner` landmark
when it is descendant of any of following elements[^2]:

- `article`
- `aside`
- `main`
- `nav`
- `section`

[^1]: https://w3c.github.io/aria/#banner
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html
