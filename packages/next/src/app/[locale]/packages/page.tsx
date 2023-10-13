import { type ReactElement } from 'react';
import Packages from '../../../features/packages';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function Page(): ReactElement {
  return <Packages />;
}
