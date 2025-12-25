import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router';
import CookiePolicy from './cookie-policy.jsx';
import DataRetentionPolicy from './data-retention-policy.jsx';
import Home from './home.jsx';
import NotFound from './not-found.jsx';
import PrivacyPolicy from './privacy-policy.jsx';
import Support from './support.jsx';
import TermsOfService from './terms-of-service.jsx';

export default function RoutesFeature(): ReactElement {
  return (
    <Routes>
      <Route path="/data/" element={<DataRetentionPolicy />} />
      <Route path="/cookies/" element={<CookiePolicy />} />
      <Route path="/privacy/" element={<PrivacyPolicy />} />
      <Route path="/support/" element={<Support />} />
      <Route path="/tos/" element={<TermsOfService />} />
      <Route path="/*" element={<NotFound />} />
      <Route index element={<Home />} />
    </Routes>
  );
}
