import { ErrorCode, isErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import type { ReactElement, ReactNode } from 'react';

interface ImplProps {
  readonly children: ErrorCode;
}

interface Props {
  readonly children: string;
  readonly variant: 'header' | 'message';
}

const mapErrorCodeToText = (
  code: ErrorCode,
): readonly [ReactNode, ReactNode] => {
  switch (code) {
    case ErrorCode.CSRF:
      return [<I18n>Test</I18n>, <I18n>Test</I18n>];
  }
};

function HashNotificationHeader({ children }: ImplProps): ReactElement {
  return <>{children}</>;
}

function HashNotificationMessage({ children }: ImplProps): ReactElement {
  return <>{children}</>;
}

export default function HashNotification({
  children,
  variant,
}: Props): ReactElement {
  const result: RegExpExecArray | null = /^#authn:code=(\d+)$/.exec(children);

  /**
   *   This branch should be impossible, because this component shouldn't mount
   * without first matching this regular expression.
   */
  if (result === null) {
    switch (variant) {
      case 'header':
        return <I18n>Unknown error</I18n>;
      case 'message':
        return <I18n>An unknown error occurred.</I18n>;
    }
  }

  const [, code] = result;
  // This should only happen if the user manually entered an invalid error code.
  if (!isErrorCode(code)) {
    switch (variant) {
      case 'header':
        return <I18n>Unknown error</I18n>;
      case 'message':
        return <I18n>An unknown error occurred.</I18n>;
    }
  }

  const [header, message] = mapErrorCodeToText(code);
  switch (variant) {
    case 'header':
      return header;
    case 'message':
      return message;
  }
}
