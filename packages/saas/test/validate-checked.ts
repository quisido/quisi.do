const validateNativeChecked = (
  element: HTMLInputElement,
  checked: boolean | 'mixed',
): void => {
  if (checked === 'mixed') {
    if (element.indeterminate) {
      return;
    }

    throw new Error('Expected checkbox to be in an indeterminate state.', {
      cause: element.indeterminate,
    });
  }

  if (element.checked === checked) {
    return;
  }

  throw new Error('Expected checkbox to be in the correct state.', {
    cause: element.checked,
  });
};

export default function validateChecked(
  element: HTMLElement,
  checked: boolean | 'mixed',
): void {
  if (!(element instanceof HTMLInputElement) || element.type !== 'checkbox') {
    if (element.ariaChecked === checked) {
      return;
    }

    throw new Error('Expected element to have the correct checked state.', {
      cause: element.ariaChecked,
    });
  }

  validateNativeChecked(element, checked);
}
