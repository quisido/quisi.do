/// <reference types="cypress" />

import mapParentSelectorToLabelSelector from './map-parent-selector-to-label-selector';

interface Options {
  readonly parentSelector?: string | undefined;
}

export default function select(
  label: string,
  value: string,
  { parentSelector }: Options,
): void {
  const selectFormElement = (formElementId: string | undefined): void => {
    if (typeof formElementId === 'undefined') {
      throw new Error(`Expected label "${label}" to have \`for\` attribute.`);
    }

    const formElementSelector = `#${formElementId}`;

    const selectValue = (selectedValue: string): void => {
      if (selectedValue === value) {
        return;
      }

      const valueSelector = `ul[aria-labelledby="${formElementId}"] > li`;
      cy.get(formElementSelector).click();
      cy.get(valueSelector).contains(value).click();
    };

    cy.get(formElementSelector).invoke('text').then(selectValue);
  };

  const labelSelector: string =
    mapParentSelectorToLabelSelector(parentSelector);
  cy.get(labelSelector)
    .contains(label)
    .invoke('attr', 'for')
    .then(selectFormElement);
}
