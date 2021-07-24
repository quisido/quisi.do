import Box from '@awsui/components-react/box';
import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import type PublicationCardItem from '../../../components/publication-cards/publication-cards.type.item';

const FIRST = 0;
const SINGLE = 1;

export default function mapMissingBannersToContent(
  missingBanners: readonly Readonly<PublicationCardItem>[],
): ReactElement {
  if (missingBanners.length === SINGLE) {
    const { title, url } = missingBanners[FIRST];
    return (
      <>
        <Link href={url}>{title}</Link> is missing its banner.
      </>
    );
  }

  return (
    <>
      <Box variant="p">The following publications are misisng banners:</Box>
      <ul>
        {missingBanners.map(
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
