import type { ReactElement } from "react";
import CloudflareInsights from '../components/cloudflare-insights.js';
import NetworkErrorLogging from "../components/network-error-logging.jsx";
import GoogleFonts from '../features/google-fonts.js';
import Preconnect from '../features/preconnect.js';
import Clarity from "../modules/react-clarity/index.jsx";
import validateString from "../utils/validate-string.js";

const CLARITY_TAG: string = validateString(process.env['CLARITY_TAG']);

export default function Head(): ReactElement {
  return (
    <head>
      {/* <ContentSecurityPolicy /> */}
      <Clarity tag={CLARITY_TAG} />
      {process.env.NODE_ENV === 'production' && (
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
      )}
      <GoogleFonts />
      <meta charSet="utf-8" />
      <NetworkErrorLogging
        includeSubdomains
        maxAge={31536000}
        reportTo="quisido"
      />
      <Preconnect />
      {/* <Traceparent /> */}
    </head>
  );
}
