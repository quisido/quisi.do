# Radio group

A radio group is a group of radio buttons[^1].

A radio group is a type of select list that can only have a single entry checked
at any one time[^1].

While a radio group is primarily meant to group and thus associate related radio
buttons, a radio group can contain other non-radio button elements. For
instance, descriptive text beyond what serves as the radio button's label, or
even in some cases, form controls or other information that are enabled,
revealed or both when a specific radio button has been chosen (checked)[^1].

However, including non-radio button content into a radio group is not without
its potential UX drawbacks. As it is generally expected to use arrow keys to
navigate between radio buttons, any non-radio button content could go unnoticed
by some users, as arrowing through the radio buttons would mean that any other
tabbable elements (e.g. hyperlinks or other form fields) would be skipped. When
creating a radio group with other arbitrary content, consider if the non-radio
content could be just as impactful if it was presented as an immediate sibling
after the radiogroup[^1].

[^1]: https://w3c.github.io/aria/#radiogroup
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/radiogroup/
