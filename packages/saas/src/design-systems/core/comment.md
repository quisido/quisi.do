# Comment

A comment contains content expressing reaction to other content[^1].

Comments can annotate any visible content, from small spans of text, to other
comments, to entire articles. Identify the relationships between comments and
the commented content, as follows[^1]:

- If the comment is a reply to another comment:
  - If all ancestor comments are available in the DOM, make each reply comment a
    semantic descendant of the comment to which it is replying, either by making
    it a DOM descendant element or by using `aria-owns`.
  - Alternatively, if all ancestor comments are not in the DOM, such as when
    comments are paginated, the hierarchical level may be indicated via
    `aria-level`. Additional group positional information may be indicated via
    `aria-posinset` and `aria-setsize`.
- Otherwise, if the comment relates to other content in the page:
  - Provide `aria-details` on the element containing the commented content with
    a value refering to the element with role `comment`.
  - If there are multiple comments related to the same commented content, either
    provide a value for `aria-details` on the commented content that refers to
    each individual comment, or use `aria-details` to refer to a parent
    container of the comments. If `aria-details` refers to an element containing
    comments rather than comment elements, assign a role of `group` or `region`
    to the referenced container.

[^1]: https://w3c.github.io/aria/#comment
