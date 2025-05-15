/// <reference types="cypress" />
import mapParentSelectorToLabelSelector from './map-parent-selector-to-label-selector.js';

interface Options {
  readonly onChange?: VoidFunction | undefined;
  readonly onIgnore?: VoidFunction | undefined;
  readonly parentSelector?: string | undefined;
}

export default function select(
  label: string,
  value: string,
  { onChange, onIgnore, parentSelector }: Options,
): void {
  const selectFormElement = (formElementId: string | undefined): void => {
    if (typeof formElementId === 'undefined') {
      throw new Error(`Expected label "${label}" to have \`for\` attribute.`);
    }

    const formElementSelector = `#${formElementId.replace(/([\\:])/gu, '\\$1')}`;

    const selectValue = (selectedValue: string): void => {
      if (selectedValue === value) {
        if (typeof onIgnore === 'function') {
          onIgnore();
        }
        return;
      }

      cy.get(formElementSelector).click({
        scrollBehavior: 'center',
      });

      const valueSelector = `ul[aria-labelledby$="${formElementId}"] > li`;
      cy.get(valueSelector).contains(value).click({
        scrollBehavior: 'center',
      });

      if (typeof onChange === 'function') {
        onChange();
      }
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
