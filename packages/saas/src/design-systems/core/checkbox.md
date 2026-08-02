# Checkbox

A checkbox is a checkable input that has three possible values: `true`, `false`,
or `mixed`[^1].

The `aria-checked` attribute of a checkbox indicates whether the input is
checked (`true`), unchecked (`false`), or represents a group of elements that
have a mixture of checked and unchecked values (`mixed`). Many checkboxes do not
use the `mixed` value, and thus are effectively boolean checkboxes[^1].

Due to the strong native semantics of HTML's native checkbox, you are advised
against using `aria-checked` on an `input` `type=checkbox`. Rather, use the
native `checked` attribute or the indeterminate IDL attribute to specify the
checkbox's "checked" or "mixed" state, respectively[^1].

WAI-ARIA supports two types of checkbox widgets: dual-state checkboxes toggle
between two choices -- checked and not checked -- and tri-state checkboxes,
which allow an additional third state known as partially checked[^2].

One common use of a tri-state checkbox can be found in software installers where
a single tri-state checkbox is used to represent and control the state of an
entire group of install options. And, each option in the group can be
individually turned on or off with a dual state checkbox[^2].

- If all options in the group are checked, the overall state is represented by
  the tri-state checkbox displaying as checked.
- If some of the options in the group are checked, the overall state is
  represented with the tri-state checkbox displaying as partially checked.
- If none of the options in the group are checked, the overall state of the
  group is represented with the tri-state checkbox displaying as not checked.

The user can use the tri-state checkbox to change all options in the group with
a single action[^2]:

- Checking the overall checkbox checks all options in the group.
- Unchecking the overall checkbox will uncheck all options in the group.
- In some implementations, the system may remember which options were checked
  the last time the overall status was partially checked. If this feature is
  provided, activating the overall checkbox a third time recreates that
  partially checked state where only some options in the group are checked.

When the checkbox has focus, pressing the Space key changes the state of the
checkbox[^2].

[^1]: https://w3c.github.io/aria/#checkbox
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
[^3]: https://aria-at.w3.org/report/163678
