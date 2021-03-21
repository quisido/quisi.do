import Box from '@awsui/components-react/box';
import Link from '@awsui/components-react/link';
import { ReactElement } from 'react';
import PublicationCardItem from '../../../types/publication-card-item';

export default function mapMissingBannersToContent(
  missingBanners: PublicationCardItem[],
): ReactElement {
  if (missingBanners.length === 1) {
    const { title, url } = missingBanners[0];
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
          ({ title, url }: PublicationCardItem): ReactElement => {
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
