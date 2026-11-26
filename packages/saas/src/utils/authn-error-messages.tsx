import { type ReactElement } from 'react';
import AlarmExistsMessage from '../components/alarm-exists-message.js';
import CsrfLink from '../components/csrf-link.js';
import I18n from '../components/i18n.js';

export function AccountPairingUnavailableMessage(): ReactElement {
  return (
    <>
      <I18n>Your session cannot currently be paired with your account.</I18n>
      <AlarmExistsMessage />
    </>
  );
}

export function AccountInfoUnreadableMessage(): ReactElement {
  return (
    <>
      <I18n>Your account information cannot currently be read.</I18n>
      <AlarmExistsMessage />
    </>
  );
}

export function AuthenticationServiceOfflineMessage(): ReactElement {
  return (
    <>
      <I18n>The authentication service is offline.</I18n>
      <AlarmExistsMessage />
    </>
  );
}

export function PatreonAccountInfoUnavailableMessage(): ReactElement {
  return (
    <>
      <I18n>We were unable to view your Patreon account information.</I18n>
      <AlarmExistsMessage />
    </>
  );
}

export function PatreonAccessTokenRefusedMessage(): ReactElement {
  return (
    <>
      <I18n>
        Patreon refused to issue an access token, but did not disclose why.
      </I18n>
      <AlarmExistsMessage />
    </>
  );
}

export function AuthenticationMustOriginateHereMessage(): ReactElement {
  return (
    <>
      To prevent <CsrfLink />, authentication must originate from this website.
    </>
  );
}
