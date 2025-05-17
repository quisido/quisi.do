export type Orientation =
  /** Displays the web app in any orientation allowed by the device's operating system or user settings. It allows the app to rotate freely to match the orientation of the device when it is rotated. */
  | 'any'

  /** Displays the web app with width greater than height. It allows the app to switch between landscape-primary and landscape-secondary orientations when the device is rotated. */
  | 'landscape'

  /** Displays the web app in landscape mode, typically with the device held in its standard horizontal position. This is usually the default app orientation on devices that are naturally landscape. Depending on the device and browser implementation, the app will typically maintain this orientation even when the device is rotated. */
  | 'landscape-primary'

  /** Displays the web app in inverted landscape mode, which is landscape-primary rotated 180 degrees. Depending on the device and browser implementation, the app will typically maintain this orientation even when the device is rotated. */
  | 'landscape-secondary'

  /** Displays the web app in the orientation considered most natural for the device, as determined by the browser, operating system, user settings, or the screen itself. It corresponds to how the device is most commonly held or used: On devices typically held vertically, such as mobile phones, natural is usually portrait-primary.  On devices typically used horizontally, such as computer monitors and tablets, natural is usually landscape-primary.  When the device is rotated, the app may or may not rotate so as to match the device's natural orientation; this behavior may vary depending on the specific device, browser implementation, and user settings. */
  | 'natural'

  /** Displays the web app with height greater than width. It allows the app to switch between portrait-primary and portrait-secondary orientations when the device is rotated. */
  | 'portrait'

  /** Displays the web app in portrait mode, typically with the device held upright. This is usually the default app orientation on devices that are naturally portrait. Depending on the device and browser implementation, the app will typically maintain this orientation even when the device is rotated. */
  | 'portrait-primary'

  /** Displays the web app in inverted portrait mode, which is portrait-primary rotated 180 degrees. Depending on the device and browser implementation, the app will typically maintain this orientation even when the device is rotated. */
  | 'portrait-secondary';
