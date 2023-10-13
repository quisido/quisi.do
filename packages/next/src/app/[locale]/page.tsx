import { type ReactElement } from 'react';
import Home from '../../features/home';

export { default as generateStaticParams } from '../../features/generate-locale-static-params';

export default function Page(): ReactElement {
  return <Home />;
}
