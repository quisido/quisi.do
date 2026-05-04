---
name: verify-design-system-component-test
description: Use this skill to verify that a design system component's test suite provides coverage for given acceptance criteria.
---

# Verify a Design System Component's Test

Given a component and its behavioral and accessibility requirements, verify that
its Vitest unit test suite provides comprehensive test coverage.

The component's test suite is located at
`src/design-systems/core-test/test-{component-name}.tsx`. For example, the test
suite for an `alertdialog` is located at
`src/design-systems/core-test/test-alert-dialog.tsx`.

## Managing Focus and Supporting Keyboard Navigation

When using standard HTML interactive elements and simple WAI-ARIA widgets,
application developers can manipulate the tab order or associate keyboard
shortcuts with elements in the document.

WAI-ARIA includes a number of "managing container" widgets, also known as
"composite" widgets. When appropriate, the container is responsible for tracking
the last descendant that was active (the default is usually the first item in
the container). It is essential that a container maintain a usable and
consistent strategy when focus leaves a container and is then later refocused.
While there can be exceptions, it is recommended that when a previously focused
container is refocused, the active descendant be the same element as the active
descendant when the container was last focused. Exceptions include cases where
the contents of a container widget have changed, and widgets like a menubar
where the user expects to always return to the first item when focus leaves the
menu bar. For example, if the second item of a tree group was the active
descendant when the user tabbed out of the tree group, then the second item of
the tree group remains the active descendant when the tree group gets focus
again. The user can also activate the container by clicking on one of the
descendants within it. When the container or its active descendant has focus,
the user can navigate through the container by pressing additional keys, such as
the arrow keys, to change the currently active descendant. Any additional press
of the main navigation key (generally the TAB key) will move out of the
container to the next widget.

Usable keyboard navigation in a rich internet application is different from the
tabbing paradigm among interactive elements, such as links and form controls, in
a static document. In rich internet applications, the user tabs to significantly
complex widgets, such as a menu or spreadsheet, and uses the arrow keys to
navigate within the widget. The changes that WAI-ARIA introduces to keyboard
navigation make this enhanced accessibility possible. In WAI-ARIA, any element
can be keyboard focusable. In addition to host language mechanisms such as
tabindex, `aria-activedescendant` provides another mechanism for keyboard
operation. Most other aspects of WAI-ARIA widget development depend on keyboard
navigation functioning properly.

When implementing `aria-activedescendant` as described below, the user agent
keeps the DOM focus on the container element or on an input element that
controls the container element. However, the user agent communicates desktop
focus events and states to the assistive technology as if the element referenced
by `aria-activedescendant` has focus. User agents are not expected to validate
that the active descendant is a descendant of the container element. It is the
responsibility of the user agent to ensure that keyboard events are processed at
the element that has DOM focus. Any keyboard events directed at the active
descendant bubble up to the DOM element with focus for processing.
