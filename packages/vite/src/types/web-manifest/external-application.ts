import type Fingerprint from './fingerprint.js';

export type Platform = 'chrome_web_store' | 'itunes' | 'play' | 'windows';

export default interface ExternalApplication {
  /** Information additional to the URL or instead of the URL, depending on the platform. */
  readonly id?: string | undefined;

  /** Information about the minimum version of an application related to this web app. */
  readonly min_version?: string | undefined;

  /** The platform it is associated to. */
  readonly platform: Platform;

  /** The URL where the application can be found. */
  readonly url?: string | undefined;

  /** An array of fingerprint objects used for verifying the application. */
  readonly fingerprints?: readonly Fingerprint[] | undefined;
}
