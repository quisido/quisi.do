import handleDesignSystemChange from './handle-design-system-change';
import select from './select';

const EXPANDO_SELECTOR = '*[role="button"]';
const NAVIGATION_ITEM_SELECTOR = 'nav ul > li';

export default function setDesignSystem(designSystem: string): void {
  beforeEach((): void => {
    cy.get(EXPANDO_SELECTOR).contains('Settings').click();

    select('Design system', designSystem, {
      onChange: handleDesignSystemChange,
      onIgnore(): void {
        cy.log(`${designSystem} design system appears to be cached.`);
      },
      parentSelector: NAVIGATION_ITEM_SELECTOR,
    });
  });
}
