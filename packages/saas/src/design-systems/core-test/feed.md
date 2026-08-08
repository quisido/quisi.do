- When focus is inside the feed[^1]:
  - `Page Down`: Move focus to next article.
  - `Page Up`: Move focus to previous article.
  - `Control + End`: Move focus to the first focusable element after the feed.
  - `Control + Home`: Move focus to the first focusable element before the feed.
- The element that contains the set of feed articles has role `feed`[^1].
- If the feed has a visible label, the feed element has `aria-labelledby`
  referring to the element containing the title. Otherwise, the feed element has
  a label specified with `aria-label`[^1].
- Each unit of content in a feed is contained in an element with role article.
  All content inside the feed is contained in an `article` element[^1].
- Each article element has `aria-labelledby` referring to elements inside the
  article that can serve as a distinguishing label[^1].
- Each article element has an `aria-describedby` referring to one or more
  elements inside the article that serve as the primary content of the
  article[^1].
- Each article element has `aria-posinset` set to a value that represents its
  position in the feed[^1].
- Each article element has `aria-setsize` set to a value that represents either
  the total number of articles that have been loaded or the total number in the
  feed, depending on which value is deemed more helpful to users. If the total
  number in the feed is undetermined, it can be represented by a `aria-setsize`
  value of `-1`[^1].
- When article elements are being added to or removed from the feed container,
  and if the operation requires multiple DOM operations, the feed element has
  `aria-busy` set to `true` during the update operation. Note that it is
  extremely important that `aria-busy` is set to `false` when the operation is
  complete or the changes may not become visible to some assistive technology
  users[^1].

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/feed/
