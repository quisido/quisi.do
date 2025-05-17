import type Image from './image.js';

export default interface Shortcut {
  /** The description member of a shortcut item is a string that allows the developer to describe the purpose of the shortcut. */
  readonly description?: string | undefined;

  /** The icons member of a shortcut item serves as iconic representations of the shortcut in various contexts. */
  readonly icons?: Image[] | undefined;

  /** The name member of a shortcut item is a string that represents the name of the shortcut as it is usually displayed to the user in a context menu. */
  readonly name?: string | undefined;

  /** The short_name member of a shortcut item is a string that represents a short version of the name of the shortcut. It is intended to be used where there is insufficient space to display the full name of the shortcut. */
  readonly short_name?: string | undefined;

  /** The url member of a shortcut item is a URL within scope of a processed manifest that opens when the associated shortcut is activated. */
  readonly url?: string | undefined;
}
