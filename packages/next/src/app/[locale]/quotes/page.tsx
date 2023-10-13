import { type ReactElement } from 'react';
import Quotes from '../../../features/quotes';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function Page(): ReactElement {
  return <Quotes />;
}
