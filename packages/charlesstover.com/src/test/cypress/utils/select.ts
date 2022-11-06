/// <reference types="cypress" />

interface Options {
  readonly parentSelector?: string | undefined;
}

export default function select(
  label: string,
  value: string,
  { parentSelector }: Options,
): Cypress.Chainable<JQuery<HTMLElement>> {
  const getSelector = (): string => {
    if (typeof parentSelector === 'undefined') {
      return 'label';
    }
    return `${parentSelector} label`;
  };

  return cy
    .get(getSelector())
    .contains(label)
    .invoke('attr', 'for')
    .then((id: string | undefined): Cypress.Chainable<JQuery<HTMLElement>> => {
      if (typeof id === 'undefined') {
        throw new Error(`Expected label "${label}" to have \`for\` attribute.`);
      }
      cy.get(`#${id}`).click();
      return cy.get(`ul[aria-labelledby="${id}"] > li`).contains(value).click();
    });
}
