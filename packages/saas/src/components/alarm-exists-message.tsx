import { type ReactElement } from 'react';
import I18n from './i18n.js';

export default function AlarmExistsMessage(): ReactElement {
  return <I18n>The team has been notified. Please try again later.</I18n>;
}
