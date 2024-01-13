import { type ReactElement, type ReactNode } from 'react';
import PACKAGE_DESCRIPTIONS from '../../../../constants/package-descriptions.js';
import Paragraph from '../../components/description-paragraph.js';
import type Item from '../../types/packages-item.js';

const mapNodeToParagraph = (
  children: ReactNode,
  index: number,
): ReactElement => <Paragraph key={index}>{children}</Paragraph>;

export default function PackageDescription({
  packageName,
}: Item): ReactElement | null {
  const description: string | undefined = PACKAGE_DESCRIPTIONS.get(packageName);

  if (typeof description === 'undefined') {
    return null;
  }

  const descriptions: readonly string[] = description.split('\n');
  return <>{descriptions.map(mapNodeToParagraph)}</>;
}
