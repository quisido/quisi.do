# Feed

A feed is a scrollable list of articles where scrolling might cause articles to
be added to or removed from either end of the list[^1].

A feed enables users of assistive technologies that have a document browse mode,
such as screen readers, to use the browse mode reading cursor to both read and
scroll through a stream of rich content that might continue scrolling infinitely
by loading more content as the user reads. In a feed, assistive technologies
provide a web application with signals of the user's reading cursor movement by
moving user agent focus, enabling the application to both add new content and
visually position content as the user browses the page. The feed also lets you
inform assistive technologies when additions and removals are occurring so
assistive technologies can more reliably update their reading view without
disrupting reading or degrading performance[^1].

For example, a feed could be used to present a stream of news stories where each
article contains a story with text, links, images, and comments as well as
widgets for sharing and commenting. As a screen reader user reads and interacts
with each story and moves the screen reader reading cursor from story to story,
each story scrolls into view and, as needed, new stories are loaded[^1].

A feed is a container element whose children have role article. When articles
are added or removed from either or both ends of a feed, set `aria-busy` to
`true` on the feed element before the changes are made and set it to `false`
after the changes are complete. Avoid inserting or removing articles in the
middle of a feed. These requirements help assistive technologies gracefully
respond to changes in the feed content that occur simultaneously with user
commands to move the reading cursor within the feed[^1].

Make each article in a feed focusable and ensure that the application scrolls an
article into view when user agent focus is set on the article or one of its
descendant elements. For example, in HTML, each article element should have a
`tabindex` value of either `-1` or `0`[^1].

Because the ability to scroll to another article with an assistive technology
reading cursor depends on the presence of another article in the page, attempt
to load additional articles before user agent focus reaches an article at either
end of the set of articles that has been loaded. Alternatively, include an
article at either or both ends of the loaded set of articles that includes an
element, such as a button, that lets the user request more articles to be
loaded[^1].

In addition to providing a brief label, apply `aria-describedby` to article
elements in a feed to suggest to screen readers which elements to speak after
the label when users navigate by article[^1].

Provide keyboard commands for moving focus among articles in a feed so users who
do not utilize an assistive technology that provides article navigation features
can use the keyboard to navigate the feed[^1].

If the number of articles available in a feed supply is static, specify
`aria-setsize` on article elements in that feed. However, if the total number is
extremely large, indefinite, or changes often, set `aria-setsize` to `-1` to
communicate the unknown size of the set[^1].

A feed is a section of a page that automatically loads new sections of content
as the user scrolls. The sections of content in a feed are presented in article
elements. So, a feed can be thought of as a dynamic list of articles that often
appears to scroll infinitely[^2].

The feature that most distinguishes feed from other ARIA patterns that support
loading data as users scroll, e.g. a grid, is that a feed is a structure, not a
widget. Consequently, assistive technologies with a reading mode, such as screen
readers, default to reading mode when interacting with feed content. However,
unlike most other WAI-ARIA structures, a feed establishes an interoperability
contract between the web page and assistive technologies. The contract governs
scroll interactions so that assistive technology users can read articles, jump
forward and backward by article, and reliably trigger new articles to load while
in reading mode[^2].

For example, a product page on a shopping site may have a related products
section that displays five products at a time. As the user scrolls, more
products are requested and loaded into the DOM. While a static design might
include a next button for loading five more products, a dynamic implementation
that automatically loads more data as the user scrolls simplifies the user
experience and reduces the inertia associated with viewing more than the first
five product suggestions. But, unfortunately when web pages load content
dynamically based on scroll events, it can cause usability and interoperability
difficulties for users of assistive technologies[^2].

The feed pattern enables reliable assistive technology reading mode interaction
by establishing the following interoperability agreement between the web page
and assistive technologies[^2]:

1. In the context of a feed, the web page code is responsible for:
   - Appropriate visual scrolling of the content based on which article contains
     DOM focus.
   - Loading or removing feed articles based on which article contains DOM
     focus.
2. In the context of a feed, assistive technologies with a reading mode are
   responsible for:
   = Indicating which article contains the reading cursor by ensuring the
     article element or one of its descendants has DOM focus.
   = Providing reading mode keys that move DOM focus to the next and previous
     articles.
   - Providing reading mode keys for moving the reading cursor and DOM focus
     past the end and before the start of the feed.

Thus, implementing the feed pattern allows a screen reader to reliably read and
trigger the loading of feed content while staying in its reading mode[^2].

Another feature of the feed pattern is its ability to facilitate skim reading
for assistive technology users. Web page authors may provide both an accessible
name and description for each article. By identifying the elements inside of an
article that provide the title and the primary content, assistive technologies
can provide functions that enable users to jump from article to article and
efficiently discern which articles may be worthy of more attention[^2].

[^1]: https://w3c.github.io/aria/#feed
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/feed/
