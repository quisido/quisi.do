- The component exposes reaction content through the `comment` role[^1].
- A reply is an accessibility descendant of the comment to which it replies
  when all ancestor comments are available[^1].
- When ancestors are omitted, such as in a paginated view, `aria-level` can
  expose hierarchy and `aria-posinset` and `aria-setsize` can expose position
  within the set[^1].
- When hierarchy metadata is not supplied, the component does not invent
  inaccurate relationship values[^1].

[^1]: https://w3c.github.io/aria/#comment
