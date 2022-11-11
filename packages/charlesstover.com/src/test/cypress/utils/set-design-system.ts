import select from './select';

const EXPANDO_SELECTOR = '*[role="button"]';
const NAVIGATION_ITEM_SELECTOR = 'nav ul > li';
const UNMOUNT_TIMEOUT = 200;

export default function setDesignSystem(designSystem: string): void {
  beforeEach((): void => {
    cy.get(EXPANDO_SELECTOR).contains('Settings').click();

    select('Design system', designSystem, {
      parentSelector: NAVIGATION_ITEM_SELECTOR,
    });

    // Wait for the previous design system to unmount.
    try {
      cy.get('body', { timeout: UNMOUNT_TIMEOUT }).should(
        ($body: JQuery<HTMLBodyElement>): void => {
          expect($body.text()).not.to.contain('CharlesStover.com');
        },
      );
    } catch (_err: unknown) {
      cy.log(`${designSystem} design system appears to be cached.`);
    }

    // Wait for the new design system to mount.
    cy.get('body').should(($body: JQuery<HTMLBodyElement>): void => {
      expect($body.text()).to.contain('CharlesStover.com');
    });
  });
}
