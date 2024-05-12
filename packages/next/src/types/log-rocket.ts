import type LR from 'logrocket';

type First = 0;
type Second = 1;

export type LogRocket = typeof LR;

export type LogRocketOptions = Parameters<LogRocket['init']>[Second] extends infer U | undefined ? U : never;

export type LogRocketRequest = Parameters<Required<Required<LogRocketOptions>['network']>['requestSanitizer']>[First];

export type LogRocketResponse = Parameters<Required<Required<LogRocketOptions>['network']>['responseSanitizer']>[First];
