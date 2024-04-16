/* eslint-disable react/jsx-key */
import { ErrorCode } from '@quisido/authn-shared';
import I18n from 'lazy-i18n';
import type { ReactNode } from 'react';

export default function mapAuthnErrorCodeToContent(
  code: ErrorCode,
): readonly [ReactNode, ReactNode] {
  switch (code) {
    case ErrorCode.CSRF:
      return [<I18n>Test</I18n>, <I18n>Test</I18n>];
    case ErrorCode.InvalidAuthnUserIdsNamespace:
    case ErrorCode.InvalidCause:
    case ErrorCode.InvalidDatabase:
    case ErrorCode.InvalidIsolateEnvironment:
    case ErrorCode.InvalidPatreonClientID:
    case ErrorCode.InvalidPatreonGrantCode:
    case ErrorCode.InvalidPatreonIdentityData:
    case ErrorCode.InvalidPatreonOAuthClientID:
    case ErrorCode.InvalidPatreonOAuthClientSecret:
    case ErrorCode.InvalidPatreonOAuthHost:
    case ErrorCode.InvalidPatreonOAuthRedirectUri:
    case ErrorCode.InvalidPatreonTokenRequest:
    case ErrorCode.InvalidUserId:
    case ErrorCode.MissingAuthnUserIdsNamespace:
    case ErrorCode.MissingCookies:
    case ErrorCode.MissingDatabase:
    case ErrorCode.MissingInvalidPatreonRequestDescription:
    case ErrorCode.MissingIsolateEnvironment:
    case ErrorCode.MissingPatreonAccessToken:
    case ErrorCode.MissingPatreonIdentityData:
    case ErrorCode.MissingPatreonIdentityId:
    case ErrorCode.MissingPatreonOAuthClientID:
    case ErrorCode.MissingPatreonOAuthClientSecret:
    case ErrorCode.MissingPatreonOAuthHost:
    case ErrorCode.MissingPatreonOAuthRedirectUri:
    case ErrorCode.MissingPatreonRequestCode:
    case ErrorCode.MissingPatreonTokenErrorBody:
    case ErrorCode.MissingPatreonTokenErrorCode:
    case ErrorCode.MissingSessionIDCookie:
    case ErrorCode.MissingState:
    case ErrorCode.MissingStateReturnPath:
    case ErrorCode.MissingStateSessionID:
    case ErrorCode.NonJsonPatreonIdentityResponse:
    case ErrorCode.NonJsonPatreonTokenErrorBody:
    case ErrorCode.NonJsonPatreonTokenResponse:
    case ErrorCode.NonJsonState:
    case ErrorCode.NonObjectPatreonIdentityResponse:
    case ErrorCode.NonObjectPatreonTokenError:
    case ErrorCode.NonObjectPatreonTokenResponse:
    case ErrorCode.NonObjectState:
    case ErrorCode.NonOkPatreonIdentityResponseStatus:
    case ErrorCode.NonStringInvalidPatreonRequestDescription:
    case ErrorCode.NonStringPatreonAccessToken:
    case ErrorCode.NonStringPatreonIdentityId:
    case ErrorCode.NonStringStateReturnPath:
    case ErrorCode.NotFound:
    case ErrorCode.PatreonIdentityForbidden:
    case ErrorCode.TooManyRequests:
    case ErrorCode.Unknown:
    case ErrorCode.UnknownCause:
    case ErrorCode.UnknownPatreonTokenError:
      return [null, null];
  }
}
