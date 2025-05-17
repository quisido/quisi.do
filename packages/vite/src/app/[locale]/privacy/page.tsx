import { type ReactElement } from 'react';
import PrivacyPolicy from '../../../features/privacy-policy.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function PrivacyPage(): ReactElement {
  return <PrivacyPolicy />;
}
