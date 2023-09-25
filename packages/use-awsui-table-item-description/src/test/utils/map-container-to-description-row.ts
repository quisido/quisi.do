import mapContainerToTbody from '../utils/map-container-to-tbody.js';

const SECOND = 1;

export default function mapContainerToDescriptionRow(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableRowElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const tr: HTMLTableRowElement | null = tbody
    .getElementsByTagName('tr')
    .item(SECOND);

  // This should never occur, so we don't need mandatory coverage on it.
  // Since it throws an error, the test will fail and block CI/CD.
  // istanbul ignore next
  if (tr === null) {
    throw new Error('Could not find description row.');
  }

  return tr;
}
