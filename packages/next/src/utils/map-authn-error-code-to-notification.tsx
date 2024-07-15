/* eslint-disable react/jsx-key */
import { ErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Link from '../modules/quisi/link.js';
import type Notification from '../types/notification.js';

function AlarmExists(): ReactElement {
  return <I18n>The developer has been notified. Please try again later.</I18n>;
};

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

function MisconfiguredPatreonClient(): ReactElement {
  return (
    <>
      <I18n>Our Patreon client is misconfigured.</I18n>
      <AlarmExists />
    </>
  );
}

function UnknownError(): ReactElement {
  return <I18n>An unknown error occurred.</I18n>;
}

export default function mapAuthnErrorCodeToNotification(
  code: ErrorCode,
): Pick<Notification, 'Header' | 'Message'> {
  switch (code) {
    case ErrorCode.CSRF:
      return {
        Header(): ReactElement {
          return <I18n>Cross-site request forgery</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n>
              The authentication attempt could not be trusted and was rejected.
            </I18n>
          );
        },
      };

    case ErrorCode.InvalidAuthnUserIdsNamespace:
      return {
        Header(): ReactElement {
          return <I18n>Invalid namespace</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>
                Your session cannot currently be paired with your account.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidCause:
    case ErrorCode.Unknown:
    case ErrorCode.UnknownCause:
      return {
        Message(): ReactElement {
          return (
            <>
              <UnknownError />
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidDatabase:
      return {
        Header(): ReactElement {
          return <I18n>Invalid database</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Your account information cannot currently be read.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidIsolateEnvironment:
      return {
        Header(): ReactElement {
          return <I18n>Invalid isolate environment</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>The authentication service is offline.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidPatreonClientID:
      return {
        Header(): ReactElement {
          return <I18n>Invalid client ID</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Patreon rejected the authentication attempt.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidPatreonGrantCode:
      return {
        Header(): ReactElement {
          return <I18n>Invalid grant code</I18n>;
        },

        Message(): ReactElement {
          return <I18n>Patreon rejected the authentication attempt.</I18n>;
        },
      };

    case ErrorCode.InvalidPatreonIdentityData:
      return {
        Header(): ReactElement {
          return <I18n>Invalid identity data</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to view your Patreon account information.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidPatreonOAuthClientID:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Invalid client ID</I18n>;
        },
      };

    case ErrorCode.InvalidPatreonOAuthClientSecret:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Invalid client secret</I18n>;
        },
      };

    case ErrorCode.InvalidPatreonOAuthHost:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Invalid host</I18n>;
        },
      };

    case ErrorCode.InvalidPatreonOAuthRedirectUri:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Invalid redirect URI</I18n>;
        },
      };

    case ErrorCode.InvalidPatreonTokenRequest:
      return {
        Header(): ReactElement {
          return <I18n>Invalid token</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n>Your Patreon authentication token could not be verified.</I18n>
          );
        },
      };

    case ErrorCode.InvalidUsageDataset:
      return {
        Header(): ReactElement {
          return <I18n>Invalid dataset</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Application usage cannot currently be tracked.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.InvalidUserId:
      return {
        Header(): ReactElement {
          return <I18n>Invalid database row</I18n>;
        },

        Message(): ReactElement {
          return <>
            <I18n>We were unable to retrieve your user ID.</I18n>
            <AlarmExists />
          </>;
        },
      };

    case ErrorCode.MissingAuthnUserIdsNamespace:
      return {
        Header(): ReactElement {
          return <I18n>Missing namespace</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>
                Your session cannot currently be paired with your account.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingCookies:
      return {
        Message(): ReactElement {
          return <I18n>You must enable cookies to authenticate.</I18n>;
        },
      };

    case ErrorCode.MissingDatabase:
      return {
        Header(): ReactElement {
          return <I18n>Missing database</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Your account information cannot currently be read.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingInvalidPatreonRequestDescription:
      return {
        Header: UnknownError,

        Message(): ReactElement {
          return (
            <>
              <I18n>
                Patreon rejected the authentication attempt, but did not disclose why.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingIsolateEnvironment:
      return {
        Header(): ReactElement {
          return <I18n>Missing isolate environment</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>The authentication service is offline.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingPatreonAccessToken:
      return {
        Header(): ReactElement {
          return <I18n>Missing access token</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Patreon did not provide an access token.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingPatreonIdentityData:
      return {
        Header(): ReactElement {
          return <I18n>Missing identity data</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to view your Patreon account information.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingPatreonIdentityId:
      return {
        Header(): ReactElement {
          return <I18n>Missing ID</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>Patreon did not provide your ID.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingPatreonOAuthClientID:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Missing client ID</I18n>;
        },
      };

    case ErrorCode.MissingPatreonOAuthClientSecret:
      return {
        Message: MisconfiguredPatreonClient,

        Header(): ReactElement {
          return <I18n>Missing client secret</I18n>;
        },
      };

    case ErrorCode.MissingPatreonOAuthRedirectUri:
      return {
        Message: UnknownError,

        Header(): ReactElement {
          return <I18n>Missing redirect URI</I18n>;
        },
      };

    case ErrorCode.MissingPatreonRequestCode:
      return {
        Header(): ReactElement {
          return <I18n>Missing code</I18n>;
        },

        Message(): ReactElement {
          return <I18n>Your authentication request lacked a code.</I18n>;
        },
      };

    case ErrorCode.MissingPatreonTokenErrorBody:
    case ErrorCode.MissingPatreonTokenErrorCode:
      return {
        Header: UnknownError,

        Message(): ReactElement {
          return (
            <>
              <I18n>
                Patreon refused to issue an access token, but did not disclose why.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.MissingSessionIDCookie:
      return {
        Header(): ReactElement {
          return <I18n>Missing session ID cookie</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n csrf={<CsrfLink />}>
              Ensure cookies are enabled. To prevent $csrf, authentication requires
              visiting this website first.
            </I18n>
          );
        },
      };

    case ErrorCode.MissingState:
    case ErrorCode.MissingStateReturnPath:
    case ErrorCode.MissingStateSessionID:
      return {
        Header(): ReactElement {
          return <I18n>Missing state</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n csrf={<CsrfLink />}>
              To prevent $csrf, authentication must originate from this website.
            </I18n>
          );
        },
      };

    case ErrorCode.NonJsonState:
    case ErrorCode.NonObjectState:
    case ErrorCode.NonStringStateReturnPath:
      return {
        Header(): ReactElement {
          return <I18n>Invalid state</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n csrf={<CsrfLink />}>
              To prevent $csrf, authentication must originate from this website.
            </I18n>
          );
        },
      };

    case ErrorCode.NonJsonPatreonIdentityResponse:
      return {
        Header(): ReactElement {
          return <I18n>Invalid Patreon identity</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>
                We were unable to view your Patreon account information.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonJsonPatreonTokenErrorBody:
    case ErrorCode.NonObjectPatreonTokenError:
      return {
        Header(): ReactElement {
          return <I18n>Invalid response</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>
              Patreon refused to issue an access token, but did not disclose why.
              </I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonJsonPatreonTokenResponse:
    case ErrorCode.NonObjectPatreonTokenResponse:
      return {
        Header(): ReactElement {
          return <I18n>Invalid response</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to retrieve your access token.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonObjectPatreonIdentityResponse:
      return {
        Header(): ReactElement {
          return <I18n>Invalid response</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to view your Patreon account information.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonOkPatreonIdentityResponseStatus:
      return {
        Header(): ReactElement {
          return <I18n>An unknown error occurred.</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to view your Patreon account information.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonStringInvalidPatreonRequestDescription:
      return {
        Message(): ReactElement {
          return (
            <>
              <I18n>An unknown error occurred.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonStringPatreonAccessToken:
      return {
        Header(): ReactElement {
          return <I18n>Invalid access token</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to retrieve your access token.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NonStringPatreonIdentityId:
      return {
        Header(): ReactElement {
          return <I18n>Invalid ID</I18n>;
        },

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to retrieve your user ID.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    case ErrorCode.NotFound:
      return {
        Header(): ReactElement {
          return <I18n>Not found</I18n>;
        },

        Message(): ReactElement {
          return <I18n>The URL you requested does not exist.</I18n>;
        },
      };

    case ErrorCode.PatreonIdentityForbidden:
      return {
        Header(): ReactElement {
          return <I18n>Forbidden</I18n>;
        },

        Message(): ReactElement {
          return (
            <I18n>Patreon rejected the authentication attempt.</I18n>
          );
        },
      };

    case ErrorCode.TooManyRequests:
      return {
        Header(): ReactElement {
          return <I18n>Too many requests</I18n>;
        },

        Message(): ReactElement {
          return <I18n>Your authentication attempt was throttled.</I18n>;
        },
      };

    case ErrorCode.UnknownPatreonTokenError:
      return {
        Header: UnknownError,

        Message(): ReactElement {
          return (
            <>
              <I18n>We were unable to retrieve your access token.</I18n>
              <AlarmExists />
            </>
          );
        },
      };

    default:
      return {
        Message: UnknownError,
      };
  }
}
