import type { Purpose } from './purpose.js';

export default interface Image {
  readonly purpose?: Purpose | undefined;

  /** The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media. */
  readonly sizes?: string | undefined;

  /** The src member of an image is a URL from which a user agent can fetch the icon's data. */
  readonly src: string;

  /** The type member of an image is a hint as to the media type of the image. */
  readonly type?: string | undefined;
}
