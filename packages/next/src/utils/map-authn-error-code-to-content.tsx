/* eslint-disable react/jsx-key */
import { ErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import type { ReactElement, ReactNode } from 'react';
import Link from '../components/link';

function CsrfLink(): ReactElement {
  return (
    <Link
      feature="utils/map-authn-error-code-to-content"
      href="https://en.wikipedia.org/wiki/Cross-site_request_forgery"
      title="Cross-site request forgery - Wikipedia"
    >
      <I18n>cross-site request forgery</I18n>
    </Link>
  );
}

export default function mapAuthnErrorCodeToContent(
  code: ErrorCode,
): readonly [ReactNode, ReactNode] {
  switch (code) {
    case ErrorCode.CSRF:
      return [
        <I18n>Cross-site request forgery</I18n>,
        <I18n>
          The authentication attempt could not be trusted and was rejected.
        </I18n>,
      ];

    case ErrorCode.InvalidAuthnUserIdsNamespace:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidCause:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidDatabase:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidIsolateEnvironment:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonClientID:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonGrantCode:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonIdentityData:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonOAuthClientID:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonOAuthClientSecret:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonOAuthHost:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonOAuthRedirectUri:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidPatreonTokenRequest:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.InvalidUserId:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingAuthnUserIdsNamespace:
      return [
        <I18n>Missing namespace</I18n>,
        <I18n>
          Your session cannot currently be paired with your account. The
          developer has been notified. Please try again later.
        </I18n>,
      ];

    case ErrorCode.MissingCookies:
      return [null, <I18n>You must enable cookies to authenticate.</I18n>];

    case ErrorCode.MissingDatabase:
      return [<I18n>Missing database</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingInvalidPatreonRequestDescription:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingIsolateEnvironment:
      return [<I18n>Missing isolate environment</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonAccessToken:
      return [<I18n>Missing access token</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonIdentityData:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonIdentityId:
      return [<I18n>Missing ID</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonOAuthClientID:
      return [<I18n>Missing client ID</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonOAuthClientSecret:
      return [<I18n>Missing client secret</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonOAuthHost:
      return [<I18n>Missing host</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonOAuthRedirectUri:
      return [null, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonRequestCode:
      return [<I18n>Missing code</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonTokenErrorBody:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingPatreonTokenErrorCode:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.MissingSessionIDCookie:
      return [
        <I18n>Missing session ID cookie</I18n>,
        <I18n csrf={<CsrfLink />}>
          Ensure cookies are enabled. To prevent $csrf, authentication requires
          visiting this website first.
        </I18n>,
      ];

    case ErrorCode.MissingState:
    case ErrorCode.MissingStateReturnPath:
    case ErrorCode.MissingStateSessionID:
    case ErrorCode.NonJsonState:
    case ErrorCode.NonObjectState:
    case ErrorCode.NonStringStateReturnPath:
      return [
        <I18n>Missing state</I18n>,
        <I18n csrf={<CsrfLink />}>
          To prevent $csrf, authentication must originate from this website.
        </I18n>,
      ];

    case ErrorCode.NonJsonPatreonIdentityResponse:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonJsonPatreonTokenErrorBody:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonJsonPatreonTokenResponse:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonObjectPatreonIdentityResponse:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonObjectPatreonTokenError:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonObjectPatreonTokenResponse:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonOkPatreonIdentityResponseStatus:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonStringInvalidPatreonRequestDescription:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonStringPatreonAccessToken:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NonStringPatreonIdentityId:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.NotFound:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.PatreonIdentityForbidden:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];

    case ErrorCode.TooManyRequests:
      return [
        <I18n>Too many requests</I18n>,
        <I18n>The authentication attempt was throttled.</I18n>,
      ];

    case ErrorCode.Unknown:
    case ErrorCode.UnknownCause:
      return [null, <I18n>An unknown error occurred.</I18n>];

    case ErrorCode.UnknownPatreonTokenError:
      return [<I18n>TODO</I18n>, <I18n>TODO</I18n>];
  }
}
