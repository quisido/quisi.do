export default function handleDesignSystemChange(): void {
  // Wait for the old design system to unmount.
  cy.get('body').should(($body: JQuery<HTMLBodyElement>): void => {
    expect($body.text()).not.to.contain('CharlesStover.com');
  });

  // Wait for the new design system to mount.
  cy.get('body').should(($body: JQuery<HTMLBodyElement>): void => {
    expect($body.text()).to.contain('CharlesStover.com');
  });
}
