import { type ReactElement } from 'react';

import I18n from './i18n.js';

export default function UnknownErrorMessage(): ReactElement {
  return <I18n>An unknown error occurred.</I18n>;
}
