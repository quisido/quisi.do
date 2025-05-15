import { type ReactElement } from 'react';
import TermsOfService from '../../../features/terms-of-service.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function TermsOfServicePage(): ReactElement {
  return <TermsOfService />;
}
