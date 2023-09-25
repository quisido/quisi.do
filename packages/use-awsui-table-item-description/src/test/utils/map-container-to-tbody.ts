const FIRST = 0;

export default function mapContainerToTbody(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableSectionElement {
  const tbody: HTMLTableSectionElement | null = container
    .getElementsByTagName('tbody')
    .item(FIRST);

  // This should never occur, so we don't need mandatory coverage on it.
  // Since it throws an error, the test will fail and block CI/CD.
  // istanbul ignore next
  if (tbody === null) {
    throw new Error('Could not find tbody.');
  }

  return tbody;
}
