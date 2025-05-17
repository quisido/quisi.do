import { type ReactElement } from 'react';
import Home from '../../features/home.js';

export { default as generateStaticParams } from '../../features/generate-locale-static-params.js';

export default function Page(): ReactElement {
  return <Home />;
}
