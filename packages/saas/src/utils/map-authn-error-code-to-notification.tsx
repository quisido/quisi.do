import { ErrorCode } from '@quisido/authn-shared';
import { type ReactElement } from 'react';
import AlarmExistsMessage from '../components/alarm-exists-message.js';
import CsrfLink from '../components/csrf-link.js';
import I18n from '../components/i18n.js';
import MisconfiguredPatreonClientMessage from '../components/misconfigured-patreon-client-message.js';
import UnknownErrorMessage from '../components/unknown-error-message.js';
import type Notification from '../types/notification.js';
import {
  AccountInfoUnreadableMessage,
  AccountPairingUnavailableMessage,
  AuthenticationMustOriginateHereMessage,
  AuthenticationServiceOfflineMessage,
  PatreonAccessTokenRefusedMessage,
  PatreonAccountInfoUnavailableMessage,
} from './authn-error-messages.js';

type NotificationHeaderAndMessage = Pick<Notification, 'Header' | 'Message'>;

const NOTIFICATIONS_BY_ERROR_CODE: Partial<
  Record<ErrorCode, NotificationHeaderAndMessage>
> = {
  [ErrorCode.CSRF]: {
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
  },

  [ErrorCode.InvalidAuthnUserIdsNamespace]: {
    Header(): ReactElement {
      return <I18n>Invalid namespace</I18n>;
    },

    Message: AccountPairingUnavailableMessage,
  },

  [ErrorCode.InvalidCause]: {
    Message(): ReactElement {
      return (
        <>
          <UnknownErrorMessage />
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.InvalidDatabase]: {
    Header(): ReactElement {
      return <I18n>Invalid database</I18n>;
    },

    Message: AccountInfoUnreadableMessage,
  },

  [ErrorCode.InvalidIsolateEnvironment]: {
    Header(): ReactElement {
      return <I18n>Invalid isolate environment</I18n>;
    },

    Message: AuthenticationServiceOfflineMessage,
  },

  [ErrorCode.InvalidPatreonClientId]: {
    Header(): ReactElement {
      return <I18n>Invalid client ID</I18n>;
    },

    Message(): ReactElement {
      return (
        <>
          <I18n>Patreon rejected the authentication attempt.</I18n>
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.InvalidPatreonGrantCode]: {
    Header(): ReactElement {
      return <I18n>Invalid grant code</I18n>;
    },

    Message(): ReactElement {
      return <I18n>Patreon rejected the authentication attempt.</I18n>;
    },
  },

  [ErrorCode.InvalidPatreonIdentityData]: {
    Header(): ReactElement {
      return <I18n>Invalid identity data</I18n>;
    },

    Message: PatreonAccountInfoUnavailableMessage,
  },

  [ErrorCode.InvalidPatreonOAuthClientId]: {
    Header(): ReactElement {
      return <I18n>Invalid client ID</I18n>;
    },
    Message: MisconfiguredPatreonClientMessage,
  },

  [ErrorCode.InvalidPatreonOAuthClientSecret]: {
    Header(): ReactElement {
      return <I18n>Invalid client secret</I18n>;
    },
    Message: MisconfiguredPatreonClientMessage,
  },

  [ErrorCode.InvalidPatreonOAuthHost]: {
    Header(): ReactElement {
      return <I18n>Invalid host</I18n>;
    },
    Message: MisconfiguredPatreonClientMessage,
  },

  [ErrorCode.InvalidPatreonOAuthRedirectUri]: {
    Header(): ReactElement {
      return <I18n>Invalid redirect URI</I18n>;
    },
    Message: MisconfiguredPatreonClientMessage,
  },

  [ErrorCode.InvalidPatreonTokenErrorResponse]: {
    Header(): ReactElement {
      return <I18n>Invalid response</I18n>;
    },

    Message: PatreonAccessTokenRefusedMessage,
  },

  [ErrorCode.InvalidPatreonTokenErrorResponseBody]: {
    Header(): ReactElement {
      return <I18n>Invalid response</I18n>;
    },

    Message: PatreonAccessTokenRefusedMessage,
  },

  [ErrorCode.InvalidUsageDataset]: {
    Header(): ReactElement {
      return <I18n>Invalid dataset</I18n>;
    },

    Message(): ReactElement {
      return (
        <>
          <I18n>Application usage cannot currently be tracked.</I18n>
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.MissingAuthnUserIdsNamespace]: {
    Header(): ReactElement {
      return <I18n>Missing namespace</I18n>;
    },

    Message: AccountPairingUnavailableMessage,
  },

  [ErrorCode.MissingCookies]: {
    Message(): ReactElement {
      return <I18n>You must enable cookies to authenticate.</I18n>;
    },
  },

  [ErrorCode.MissingDatabase]: {
    Header(): ReactElement {
      return <I18n>Missing database</I18n>;
    },

    Message: AccountInfoUnreadableMessage,
  },

  [ErrorCode.MissingIsolateEnvironment]: {
    Header(): ReactElement {
      return <I18n>Missing isolate environment</I18n>;
    },

    Message: AuthenticationServiceOfflineMessage,
  },

  [ErrorCode.MissingPatreonAccessToken]: {
    Header(): ReactElement {
      return <I18n>Missing access token</I18n>;
    },

    Message(): ReactElement {
      return (
        <>
          <I18n>Patreon did not provide an access token.</I18n>
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.MissingPatreonIdentityData]: {
    Header(): ReactElement {
      return <I18n>Missing identity data</I18n>;
    },

    Message: PatreonAccountInfoUnavailableMessage,
  },

  [ErrorCode.MissingPatreonIdentityId]: {
    Header(): ReactElement {
      return <I18n>Missing ID</I18n>;
    },

    Message(): ReactElement {
      return (
        <>
          <I18n>Patreon did not provide your ID.</I18n>
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.MissingPatreonOAuthClientSecret]: {
    Header(): ReactElement {
      return <I18n>Missing client secret</I18n>;
    },
    Message: MisconfiguredPatreonClientMessage,
  },

  [ErrorCode.MissingPatreonRequestCode]: {
    Header(): ReactElement {
      return <I18n>Missing code</I18n>;
    },

    Message(): ReactElement {
      return <I18n>Your authentication request lacked a code.</I18n>;
    },
  },

  [ErrorCode.MissingPatreonTokenErrorResponseBody]: {
    Header: UnknownErrorMessage,

    Message: PatreonAccessTokenRefusedMessage,
  },

  [ErrorCode.MissingPatreonTokenErrorResponseCode]: {
    Header: UnknownErrorMessage,

    Message: PatreonAccessTokenRefusedMessage,
  },

  [ErrorCode.MissingSessionIdCookie]: {
    Header(): ReactElement {
      return <I18n>Missing session ID cookie</I18n>;
    },

    Message(): ReactElement {
      return (
        <>
          Ensure cookies are enabled. To prevent <CsrfLink />, authentication
          requires visiting this website first.
        </>
      );
    },
  },

  [ErrorCode.MissingStateSessionId]: {
    Header(): ReactElement {
      return <I18n>Missing state</I18n>;
    },

    Message: AuthenticationMustOriginateHereMessage,
  },

  [ErrorCode.NonObjectState]: {
    Header(): ReactElement {
      return <I18n>Invalid state</I18n>;
    },

    Message: AuthenticationMustOriginateHereMessage,
  },

  [ErrorCode.NotFound]: {
    Header(): ReactElement {
      return <I18n>Not found</I18n>;
    },

    Message(): ReactElement {
      return <I18n>The URL you requested does not exist.</I18n>;
    },
  },

  [ErrorCode.TooManyRequests]: {
    Header(): ReactElement {
      return <I18n>Too many requests</I18n>;
    },

    Message(): ReactElement {
      return <I18n>Your authentication attempt was throttled.</I18n>;
    },
  },

  [ErrorCode.Unknown]: {
    Message(): ReactElement {
      return (
        <>
          <UnknownErrorMessage />
          <AlarmExistsMessage />
        </>
      );
    },
  },

  [ErrorCode.UnknownCause]: {
    Message(): ReactElement {
      return (
        <>
          <UnknownErrorMessage />
          <AlarmExistsMessage />
        </>
      );
    },
  },
};

export default function mapAuthnErrorCodeToNotification(
  code: ErrorCode,
): NotificationHeaderAndMessage {
  return (
    NOTIFICATIONS_BY_ERROR_CODE[code] ?? {
      Message: UnknownErrorMessage,
    }
  );
}
