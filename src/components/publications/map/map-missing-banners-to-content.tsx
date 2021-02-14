import Box from '@awsui/components-react/box';
import Link from '@awsui/components-react/link';
import { ReactElement } from 'react';
import Item from '../types/item';

export default function mapMissingBannersToContent(
  missingBanners: Item[],
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
