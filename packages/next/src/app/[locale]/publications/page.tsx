import { type ReactElement } from 'react';
import Publications from '../../../features/publications';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function Page(): ReactElement {
  return <Publications />;
}
