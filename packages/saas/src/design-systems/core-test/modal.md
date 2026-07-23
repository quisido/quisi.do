- The modal has an `aria-modal` attribute.
- User interaction is limited to the modal's contents.
- When the modal loses focus, user interaction is no longer limited to the
  modal's contents.
- When the modal is removed, user interaction is no longer limited to the
  modal's contents.
- All controls (e.g. a close button) must be descendants of the modal.
- All sibling content should be marked as inert ("inert subtree" in HTML).
