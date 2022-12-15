import type { ReactElement, ReactNode } from 'react';
import PACKAGE_DESCRIPTIONS from '../../../../constants/package-descriptions';
import filterByUndefined from '../../../../utils/filter-by-undefined';
import Paragraph from '../../components/description-paragraph';
import type Item from '../../types/packages-item';

const mapNodeToParagraph = (
  children: ReactNode,
  index: number,
): ReactElement => <Paragraph key={index}>{children}</Paragraph>;

export default function PackageDescription({
  packageName,
}: Item): ReactElement | null {
  const description: string | undefined = PACKAGE_DESCRIPTIONS.get(packageName);

  if (filterByUndefined(description)) {
    return null;
  }

  const descriptions: readonly string[] = description.split('\n');
  return <>{descriptions.map(mapNodeToParagraph)}</>;
}
