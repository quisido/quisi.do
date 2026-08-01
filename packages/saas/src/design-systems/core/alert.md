# Alert

Alerts convey messages that will be immediately important to users. In the case
of audio warnings, visibly displayed alerts provide an accessible alternative to
audible alerts for Deaf or hard-of-hearing users. Likewise, alerts can provide
an accessible alternative to the visible alerts for blind, deaf-blind, or
low-vision users, and others with certain developmental disabilities. The Alert
components contains the alert message[^1].

An alert is a special type of assertive live region that is intended to cause
immediate notification for assistive technology users[^1].

You are not required to set or manage focus to an alert in order for it to be
processed. Since alerts are not required to receive focus, do not require users
to close an alert. If you want focus to move to a message when it is conveyed,
use an AlertDialog component instead of an alert[^1].

Alerts have an implicit `aria-live` value of `'assertive'`, and an implicit
`aria-atomic` value of `true`[^1].

An alert is triggered by an event, such as an error, warning condition, or the
arrival of information that is important in the context of the user's task[^2].

[^1]: [Accessible Rich Internet Applications (WAI-ARIA) 1.3 `alert` role](https://w3c.github.io/aria/#alert)
[^2]: [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/)
