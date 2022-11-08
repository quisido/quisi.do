import select from './select';

export default function setDesignSystem(name: string): void {
  beforeEach((): void => {
    cy.get('*[role="button"]').contains('Settings').click();
    select('Design system', name, {
      parentSelector: 'nav ul > li',
    });
  });
}
