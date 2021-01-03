import Box from '@awsui/components-react/box';
import Link from '@awsui/components-react/link';
import { ReactElement } from 'react';
import Item from '../types/item';

export default function mapDevArticlesToContent(
  devArticles: Item[],
): ReactElement {
  if (devArticles.length === 1) {
    const { title, url } = devArticles[0];
    return (
      <>
        <Link href={url}>{title}</Link> couild not be found on Medium.
      </>
    );
  }

  return (
    <>
      <Box variant="p">
        The following publications could not be found on Medium:
      </Box>
      <ul>
        {devArticles.map(
          ({ title, url }: Item): ReactElement => {
            return (
              <li key={title}>
                <Link href={url}>{title}</Link>
              </li>
            );
          },
        )}
      </ul>
    </>
  );
}
