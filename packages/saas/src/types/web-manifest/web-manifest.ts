import type ExternalApplication from './external-application.js';
import type Image from './image.js';
import type { Orientation } from './orientation.js';
import type Shortcut from './shortcut.js';

// https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/web-manifest.json

type Dir = 'auto' | 'ltr' | 'rtl';
type Display = 'browser' | 'fullscreen' | 'minimal-ui' | 'standalone';

export default interface WebManifest {
  /** The background_color member describes the expected background color of the web application. */
  readonly background_color?: string | undefined;

  /** The base direction of the manifest. */
  readonly dir?: Dir | undefined;

  /** The item represents the developer's preferred display mode for the web application. */
  readonly display?: Display | undefined;

  /** The icons member is an array of icon objects that can serve as iconic representations of the web application in various contexts. */
  readonly icons?: readonly Image[] | undefined;

  /** A string that represents the id of the web application. */
  readonly id?: string | undefined;

  /** The primary language for the values of the manifest. */
  readonly lang?: string | undefined;

  /** The name of the web application. */
  readonly name?: string | undefined;

  /** The orientation member is a string that serves as the default orientation for all  top-level browsing contexts of the web application. */
  readonly orientation?: Orientation | undefined;

  /** Boolean value that is used as a hint for the user agent to say that related applications should be preferred over the web application. */
  readonly prefer_related_applications?: boolean | undefined;

  /** Array of application accessible to the underlying application platform that has a relationship with the web application. */
  readonly related_applications?: readonly ExternalApplication[] | undefined;

  /** A string that represents the navigation scope of this web application's application context. */
  readonly scope?: string | undefined;

  /** A string that represents a short version of the name of the web application. */
  readonly short_name?: string | undefined;

  /** Array of shortcut items that provide access to key tasks within a web application. */
  readonly shortcuts?: readonly Shortcut[] | undefined;

  /** Represents the URL that the developer would prefer the user agent load when the user launches the web application. */
  readonly start_url?: string | undefined;

  /** The theme_color member serves as the default theme color for an application context. */
  readonly theme_color?: string | undefined;
}
