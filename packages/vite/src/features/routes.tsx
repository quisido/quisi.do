import { type ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import CookiePolicy from './cookie-policy.js';
import DataRetentionPolicy from './data-retention-policy.js';
import Home from './home.js';
import NotFound from './not-found.js';
import PrivacyPolicy from './privacy-policy.js';
import Support from './support.js';
import TermsOfService from './terms-of-service.js';
import DesignSystemDemo from './design-system-demo.js';

export default function RoutesFeature(): ReactElement {
  return (
    <Routes>
      <Route path="/data/" element={<DataRetentionPolicy />} />
      <Route path="/design-systems/" element={<DesignSystemDemo />} />
      <Route path="/cookies/" element={<CookiePolicy />} />
      <Route path="/privacy/" element={<PrivacyPolicy />} />
      <Route path="/support/" element={<Support />} />
      <Route path="/tos/" element={<TermsOfService />} />
      <Route path="/*" element={<NotFound />} />
      <Route index element={<Home />} />
    </Routes>
  );
}
