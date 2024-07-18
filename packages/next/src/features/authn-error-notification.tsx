import { type ErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import { type ComponentType, type ReactElement } from 'react';
import { type NoActionNotification } from '../types/notification.js';
import mapAuthnErrorCodeToNotification from '../utils/map-authn-error-code-to-notification.jsx';
import mapHashToAuthnErrorCode from '../utils/map-hash-to-authn-error-code';
import AuthnErrorsTranslationsProvider from './authn-errors-translations-provider.jsx';

function AnUnknownErrorOccurred(): ReactElement {
  return <I18n>An unknown error occurred.</I18n>;
}

export default class AuthnErrorNotification implements NoActionNotification {
  public readonly icon = '⚠️';

  readonly #Header: ComponentType | undefined;

  readonly #Message: ComponentType;

  public readonly type = 'error';

  public constructor(code: ErrorCode | null) {
    /**
     *   This should only happen if the user manually entered an invalid error
     * code into their address bar.
     */
    if (code === null) {
      this.#Message = AnUnknownErrorOccurred;
    } else {
      const { Header, Message } = mapAuthnErrorCodeToNotification(code);
      this.#Message = Message;
      if (typeof Header !== 'undefined') {
        this.#Header = Header;
      }
    }
  }

  public get Header(): ComponentType | undefined {
    const Component: ComponentType | undefined = this.#Header;
    if (typeof Component === 'undefined') {
      return;
    }

    return function HeaderImpl(): ReactElement {
      return (
        <AuthnErrorsTranslationsProvider>
          <Component />
        </AuthnErrorsTranslationsProvider>
      );
    };
  }

  public Message(): ReactElement {
    const Component: ComponentType = this.#Message;
    return (
      <AuthnErrorsTranslationsProvider>
        <Component />
      </AuthnErrorsTranslationsProvider>
    );
  }

  public static fromHash(hash: string): AuthnErrorNotification {
    const code: ErrorCode | null = mapHashToAuthnErrorCode(hash);
    return new AuthnErrorNotification(code);
  }
}
