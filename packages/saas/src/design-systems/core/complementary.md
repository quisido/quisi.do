# Complementary

A complementary landmark is designed to be complementary to the main content
that it is a sibling to, or a direct descendant of. The contents of a
complementary landmark would be expected to remain meaningful if it were to be
separated from the main content it is relevant to[^1].

There are various types of content that would appropriately have this role. For
example, in the case of a portal, this can include but not be limited to show
times, current weather, related articles, or stocks to watch. If the
complementary content is completely separable from the main content, it might be
appropriate to use a more general role[^1].

A complementary landmark is a supporting section of the document, designed to be
complementary to the main content at a similar level in the DOM hierarchy, but
remains meaningful when separated from the main content[^2].

Complementary landmarks should be top level landmarks (e.g. not contained within
any other landmarks)[^2].

If the complementary content is not related to the main content, a more general
role should be assigned (e.g. region)[^2].

If a page includes more than one complementary landmark, each should have a
unique label[^2].

When only one complementary landmark on a page, a label is optional. When there
is more than one complementary landmark on a page, each should have a unique
label[^2].

[^1]: https://w3c.github.io/aria/#complementary
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/complementary.html
