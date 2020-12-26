import Box from '@awsui/components-react/box';
import { ReactElement } from 'react';
import Item from '../../types/item';

export default function PackageDescription({
  description,
}: Item): null | ReactElement {
  if (typeof description === 'undefined') {
    return null;
  }

  return (
    <>
      {description.map(
        (paragraph: string): ReactElement => {
          return (
            <Box
              color="text-body-secondary"
              fontSize="body-s"
              key={paragraph}
              variant="p"
            >
              {paragraph}
            </Box>
          );
        },
      )}
    </>
  );
}
