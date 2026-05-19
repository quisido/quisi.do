import type LR from 'logrocket';
import { type Compulsory } from './compulsory.js';

export type LogRocket = typeof LR;

export type LogRocketOptions = Parameters<LogRocket['init']>[1] extends
  | infer U
  | undefined
  ? U
  : never;

export type LogRocketRequest = Parameters<
  Compulsory<Compulsory<LogRocketOptions['network']>['requestSanitizer']>
>[0];

export type LogRocketResponse = Parameters<
  Compulsory<Compulsory<LogRocketOptions['network']>['responseSanitizer']>
>[0];
