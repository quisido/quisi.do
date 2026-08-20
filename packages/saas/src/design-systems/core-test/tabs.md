- Tabs must be children of tab lists[^1].
- If a tab is active, a corresponding tab panel that represents the active tab
  is rendered[^1].
- Associate a tab panel with its tab by using the `aria-controls` attribute on
  the tab to reference the tab panel and/or by using the `aria-labelledby`
  attribute on the tab panel to reference the tab[^1].
- The tab panel associated with the currently active tab is perceivable to the
  user[^1].
- A selected tab has its `aria-selected` attribute set to `true`[^1].
- Inactive tabs have their `aria-selected` attributes set to `false`[^1].
- The currently selected tab provides a visual indication that it is
  selected[^1].
- Descendants must have their focus managed[^2].
- For a single-selectable tab lists, other tab panels must be hidden from all
  users until the user selects the tab associated with that tab panel[^2].
- For a multi-selectable tab list, the tab for each visible tab panel must have
  the `aria-expanded` attribute set to `true`, and that the tabs associated with
  the remaining hidden from all users tab panels have their `aria-expanded`
  attributes set to `false`[^2].
- Tab lists have an implicit `aria-orientation` value of `'horizontal'`[^2].

[^1]: https://w3c.github.io/aria/#tab

[^2]: https://w3c.github.io/aria/#tablist

[^3]: https://aria-at.w3.org/report/163664
