import type { ErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import type { ReactElement, ReactNode } from 'react';
import mapHashToAuthnErrorCode from '../utils/map-hash-to-authn-error-code';
import type { WithKey } from '../types/with-key.js';
import type { NoActionNotification } from '../types/notification.js';
import mapAuthnErrorCodeToContent from '../utils/map-authn-error-code-to-content';

export interface Options {
  readonly onDismiss: VoidFunction;
}

export default class AuthnErrorNotification
  implements WithKey<NoActionNotification>
{
  public readonly icon = '⚠️';

  public readonly key = 'authn:error';

  public readonly Header: () => ReactNode;

  public readonly Message: () => ReactNode;

  public readonly onDismiss: VoidFunction;

  public readonly type = 'error';

  public constructor(code: ErrorCode | null, { onDismiss }: Options) {
    this.onDismiss = onDismiss;

    /**
     *   This should only happen if the user manually entered an invalid error
     * code into their address bar.
     */
    if (code === null) {
      this.Header = function Header(): ReactElement {
        return <I18n>Unknown error</I18n>;
      };
      this.Message = function Message(): ReactElement {
        return <I18n>An unknown error occurred.</I18n>;
      };
    } else {
      const [header, message] = mapAuthnErrorCodeToContent(code);
      this.Header = function Header(): ReactNode {
        return header;
      };
      this.Message = function Header(): ReactNode {
        return message;
      };
    }
  }

  public static fromHash(
    hash: string,
    options: Options,
  ): AuthnErrorNotification {
    const code: ErrorCode | null = mapHashToAuthnErrorCode(hash);
    return new AuthnErrorNotification(code, options);
  }
}
