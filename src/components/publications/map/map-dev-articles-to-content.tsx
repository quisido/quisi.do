import Box from '@awsui/components-react/box';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import type PublicationCardItem from '../../../components/publication-cards/publication-cards.type.item';

const FIRST = 0;
const SINGLE = 1;

export default function mapDevArticlesToContent(
  devArticles: readonly Readonly<PublicationCardItem>[],
): ReactElement {
  if (devArticles.length === SINGLE) {
    const { title, url } = devArticles[FIRST];
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
          ({ title, url }: Readonly<PublicationCardItem>): ReactElement => {
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
