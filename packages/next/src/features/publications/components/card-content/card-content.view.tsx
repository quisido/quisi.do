import { type ReactElement } from 'react';
import Banner from '../../components/banner';
import Stats from '../../components/stats';
import type Publication from '../../types/publication';

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
