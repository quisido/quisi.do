import type { ReactElement } from 'react';
import type { ComboBoxProps } from '../shared/combo-box-props.js';

/**
 *   A `ComboBox` component is an input that controls another element, such as a
 * list box or grid, that can dynamically pop up to help the user set the value
 * of the input.
 *   A combobox functionally combines a named input field with the ability to assist value selection via a supplementary popup element. A combobox input MAY be either a single-line text field that supports editing and typing or an element that only displays the current value of the combobox. If the combobox supports text input and provides autocompletion behavior as described in aria-autocomplete, authors MUST set aria-autocomplete on the combobox element to the value that corresponds to the provided behavior.

Typically, the initial state of a combobox is collapsed. In the collapsed state, only the combobox element and a separate, optional popup control button are visible. A combobox is said to be expanded when both the combobox element showing its current value and its associated popup element are visible. Authors MUST set aria-expanded to true on an element with role combobox when it is expanded and false when it is collapsed.

Elements with the role combobox have an implicit aria-haspopup value of listbox. If the combobox popup element has a role other than listbox, authors MUST specify an aria-haspopup value of tree, grid, menu, or dialog that corresponds to the role of its popup.

If the user interface includes an additional icon that allows the visibility of the popup to be controlled via pointer and touch events, authors SHOULD ensure that element has role button, that it is focusable but not included in the page Tab sequence, and that it is not a descendant of the element with role combobox. In addition, to be keyboard accessible, authors SHOULD provide keyboard mechanisms for moving focus between the combobox element and elements contained in the popup. For example, one common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element. If the popup element supports aria-activedescendant, in lieu of moving focus, such keyboard mechanisms can control the value of aria-activedescendant on the combobox element. When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup while focus remains on the combobox element.

User agents MUST expose the value of elements with role combobox to assistive technologies. The value of a combobox is represented by one of the following:

If the combobox element is a host language element that provides a value, such as an HTML input element, the value of the combobox is the value of that element.
Otherwise, the value of the combobox is represented by its descendant elements and can be determined using the same method used to compute the name of a button from its descendant content.

((
The ARIA 1.0 specification required the input element with the combobox role to be a single-line text field and reference the popup element with aria-owns instead of aria-controls.
The ARIA 1.1 specification, which was not broadly supported by assistive technologies, required the combobox to be a non-focusable element with two required accessibility children -- a focusable textbox and a popup element controlled by the textbox.
The changes introduced in ARIA 1.2 improve interoperability with assistive technologies and enable authors to create presentations of combobox that more closely imitate a native HTML select element.
))
 * @see {@link https://w3c.github.io/aria/#combobox | WAI-ARIA `combobox` role}
 */
export default function ComboBox({
  children,
  disabled = false,
  label,
  readOnly = false,
}: ComboBoxProps): ReactElement {
  const expanded = false;

  return (
    <label aria-expanded={expanded} aria-haspopup="listbox" role="combobox">
      <span>{label}</span>
      <select
        aria-disabled={disabled}
        aria-readonly={readOnly}
        disabled={disabled}
      >
        {children}
      </select>
    </label>
  );
}
