import { type ReactElement } from 'react';
import Banner from '../../components/banner.js';
import Stats from '../../components/stats.js';
import type Publication from '../../types/publication.js';

export default function PublicationsCardContent({
  dateTime,
  image,
  reactions,
  readingTime,
  title,
  url,
  views,
}: Readonly<Publication>): ReactElement {
  return (
    <>
      <Banner
        dateTime={dateTime}
        image={image}
        reactions={reactions}
        readingTime={readingTime}
        title={title}
        url={url}
        views={views}
      />
      <Stats dateTime={dateTime} reactions={reactions} views={views} />
    </>
  );
}
