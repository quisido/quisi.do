import { type ReactElement } from 'react';
import PrivacyFeature from '../../../features/privacy.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function PrivacyPage(): ReactElement {
  return <PrivacyFeature />;
}
