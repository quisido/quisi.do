# Spin button

A spin button is a form of range that expects the user to select from among
discrete choices[^1].

A spin button typically allows users to change its displayed value by activating
increment and decrement buttons that step through a set of allowed values. Some
implementations display the value in an text field that allows editing and
typing but typically limits input in ways that help prevent invalid values[^1].

Although a spin button is similar in appearance to many presentations of select,
it is advisable to use spin button when working with known ranges (especially in
the case of large ranges) as opposed to distinct options. For example, a spin
button representing a range from 1 to 1,000,000 would provide much better
performance than a select widget representing the same values[^1].

[^1]: https://w3c.github.io/aria/#spinbutton
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/
[^3]: https://www.w3.org/WAI/ARIA/apg/practices/range-related-properties/
