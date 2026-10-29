import {
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type PlaywrightWorkerArgs,
  type PlaywrightWorkerOptions,
} from '@playwright/test';
import type QuisidoPageObject from './quisido-page-object.js';

interface QuisidoTestArgs {
  readonly quisido: QuisidoPageObject;
}

export type TestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  QuisidoTestArgs;

export type WorkerArgs = PlaywrightWorkerArgs & PlaywrightWorkerOptions;
