# Tree grid

A tree grid is a grid whose rows can be expanded and collapsed in the same
manner as for a tree[^1].

If a tree grid is read-only, all of its grid cells are implicitly read-only
unless explictly overridden[^1].

When a focusable grid cell is read-only, the content contained in it is not
editable[^1].

In a tree grid that provides content editing functions, if the content of a
focusable grid cell element is not editable, set `aria-readonly` to `true` on
the grid cell. However, if a tree grid presents a collection of elements that do
not support `aria-readonly`, such as a collection of links, it is not necessary
for the author to specify a value for `aria-readonly`[^1].

[^1]: https://w3c.github.io/aria/#treegrid
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/
