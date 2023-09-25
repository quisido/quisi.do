import mapContainerToTbody from '../utils/map-container-to-tbody.js';

const SECOND = 1;

export default function mapContainerToDescriptionCell(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableCellElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const td: HTMLTableCellElement | null = tbody
    .getElementsByTagName('td')
    .item(SECOND);

  // This should never occur, so we don't need mandatory coverage on it.
  // Since it throws an error, the test will fail and block CI/CD.
  // istanbul ignore next
  if (td === null) {
    throw new Error('Could not find description cell.');
  }

  return td;
}
