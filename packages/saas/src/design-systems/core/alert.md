# Alert

Alerts convey messages that will be immediately important to users. In the case
of audio warnings, visibly displayed alerts provide an accessible alternative to
audible alerts for Deaf or hard-of-hearing users. Likewise, alerts can provide
an accessible alternative to the visible alerts for blind, deaf-blind, or
low-vision users, and others with certain developmental disabilities. The Alert
component contains the alert message[^1].

An alert is a special type of assertive live region that is intended to cause
immediate notification for assistive technology users[^1].

You are not required to set or manage focus to an alert in order for it to be
processed. Since alerts are not required to receive focus, do not require users
to close an alert. If you want focus to move to a message when it is conveyed,
use an [alert dialog](./alert-dialog.md) instead of an alert[^1].

Alerts have an implicit `aria-live` value of `'assertive'`, and an implicit
`aria-atomic` value of `true`[^1].

An alert displays a brief, important message in a way that attracts the user's
attention without interrupting the user's task[^2].

Dynamically rendered alerts are automatically announced and may trigger an alert
sound. Screen readers do not inform users of alerts that are present on the page
before page load completes[^2].

Because alerts are intended to provide important and potentially time-sensitive
information without interfering with the user's ability to continue working, it
is crucial they do not affect keyboard focus[^2].

Avoid designing alerts that disappear automatically. An alert that disappears
too quickly can lead to failure to meet WCAG 2.0 success criterion 2.2.3.
Frequent alert interruptions inhibit usability for people with visual and
cognitive disabilities, which makes meeting the requirements of WCAG 2.0 success
criterion 2.2.4 more difficult[^2].

An alert is triggered by an event, such as an error, warning condition, or the
arrival of information that is important in the context of the user's task[^2].

For situations where interrupting work flow is necessary, see
[alert dialog](./alert-dialog.md).

[^1]: https://w3c.github.io/aria/#alert
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
