import type { ReactElement, ReactNode } from 'react';
import PACKAGE_DESCRIPTIONS from '../../constants/package-descriptions';
import type Item from './packages.type.item';
import Paragraph from './packages.view.description-paragraph';

const mapParagraphToElement = (
  paragraph: ReactNode,
  index: number,
): ReactElement => <Paragraph key={index}>{paragraph}</Paragraph>;

export default function PackageDescription({
  packageName,
}: Item): ReactElement | null {
  const description: ReactNode | undefined =
    PACKAGE_DESCRIPTIONS.get(packageName);

  if (typeof description === 'undefined') {
    return null;
  }

  if (!Array.isArray(description)) {
    return <Paragraph>{description}</Paragraph>;
  }

  return <>{description.map(mapParagraphToElement)}</>;
}
