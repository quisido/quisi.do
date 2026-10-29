import { type ReactElement } from 'react';
import AlarmExistsMessage from './alarm-exists-message.js';
import I18n from './i18n.js';

export default function MisconfiguredPatreonClientMessage(): ReactElement {
  return (
    <>
      <I18n>Our Patreon client is misconfigured.</I18n>
      <AlarmExistsMessage />
    </>
  );
}
