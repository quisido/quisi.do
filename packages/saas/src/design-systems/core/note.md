# Note

A note is a section whose content represents additional information or
parenthetical context to the primary content it supplements[^1].

A note is content provided by the author of the page or document, it is not to
be used for providing reactions or suggestions[^1]. For these purposes, please
review [comment](./comment.md) and [suggestion](./suggestion.md).

When used within the normal flow of a page's content, a note has an implicit
association with the content that it supplements. The following example
demonstrates using a note to call out additional information in the natural
reading order of a page[^1]:

```jsx
<Paragraph>
  ... the following results outline support for the tested features.
</Paragraph>
<Note>
  <Paragraph>
    Please keep in mind that at the time of publishing this page all results
    were accurate.
  </Paragraph>
  <Paragraph>
    If you find any variations in results, please let us know!
  </Paragraph>
</Note>
<Paragraph>...</Paragraph>
```

In cases where a note has been determined to need a programmatic association
with the content it supplements, use one of the following mechanisms to
associate the elements[^1]:

- If the note contains structured or interactive content (for example: a link,
  button, list, table, etc.) use `aria-details`.
- If the note is brief and consists of static text, use `aria-describedby`.

[^1]: https://w3c.github.io/aria/#note
