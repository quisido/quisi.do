import Box from '@awsui/components-react/box';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import PACKAGE_DESCRIPTIONS from '../../../../constants/package-descriptions';
import Item from '../../types/item';

function Paragraph({ children }: PropsWithChildren<unknown>): ReactElement {
  return (
    <Box color="text-body-secondary" fontSize="body-s" variant="p">
      {children}
    </Box>
  );
}

export default function PackageDescription({
  packageName,
}: Item): null | ReactElement {
  const description: ReactNode | undefined = PACKAGE_DESCRIPTIONS.get(
    packageName,
  );

  if (typeof description === 'undefined') {
    return null;
  }

  if (Array.isArray(description)) {
    return (
      <>
        {description.map(
          (paragraph: ReactNode, index: number): ReactElement => {
            return <Paragraph key={index}>{paragraph}</Paragraph>;
          },
        )}
      </>
    );
  }

  return <Paragraph>{description}</Paragraph>;
}
