import type { ReactElement } from 'react';
import type { SuggestionProps } from '../core/suggestion-props.js';

/**
 *   A suggestion... A single proposed change to content.

For example, in an editing system that supports multiple users, one user can suggest a change, and another user would be responsible for accepting or rejecting the suggestion.

Authors MUST ensure that a suggestion contains either one insertion child or one deletion child or ensure that it contains two children where one is an insertion and the other is a deletion. Authors MUST ensure a suggestion does not contain any other children.

Authors MAY use aria-details or aria-description to associate the suggestion with related information such as comments, authoring info, and time stamps.

```
<p>
  The best pet is a
  <span role="suggestion">
    <span role="deletion">cat</span>
    <span role="insertion">dog</span>
  </span>
</p>
```

When a suggestion is accepted, authors SHOULD remove the suggestion role, indicating that the proposed revision has been made. After the suggestion role is removed, child insertion and deletion elements can either be retained to document the revision or replaced with the revised content.
 * @see {@link https://w3c.github.io/aria/#suggestion | WAI-ARIA `suggestion` role}
 */
export default function Suggestion({
  children,
  label,
}: SuggestionProps): ReactElement {
  return (
    <ins aria-label={label} role="suggestion">
      {children}
    </ins>
  );
}
