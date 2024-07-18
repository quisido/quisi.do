import { type ReactElement } from 'react';
import Support from '../../../features/support.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function SupportPage(): ReactElement {
  return <Support />;
}
