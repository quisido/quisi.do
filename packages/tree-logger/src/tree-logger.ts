import styles from 'ansi-styles';
import assert from 'node:assert';
import type Tree from './types/tree.js';
import mapStringToLast2Characters from './utils/map-string-to-last-2-characters.js';
import mapStringToShorten2Characters from './utils/map-string-to-shorten-2-characters.js';

const ERROR_CODE = 1;
const INDEX_OFFSET = 1;
const NONE = 0;
const SINGLE = 1;
const SPACING = '   ';

export default class TreeLogger {
  private _indent = NONE;

  private readonly _tree: Tree;

  public constructor(value: string) {
    this._tree = {
      children: [],
      errors: [],
      value,
    };

    process.on('uncaughtException', this.handleUncaughtException);
  }

  private get currentItem(): Tree {
    let currentItem: Tree = this._tree;
    for (let i = 0; i < this._indent; i++) {
      const currentItemChildrenLastIndex: number =
        currentItem.children.length - INDEX_OFFSET;
      const lastItem: Tree | undefined =
        currentItem.children[currentItemChildrenLastIndex];
      assert(typeof lastItem !== 'undefined');
      currentItem = lastItem;
    }
    return currentItem;
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public addError = (err: Readonly<Error>): void => {
    this.currentItem.errors.push(err);
  };

  public addItem = (value: string): this => {
    this.currentItem.children.push({
      children: [],
      errors: [],
      value,
    });
    return this;
  };

  public log = (): this => {
    console.log('');
    const errorsCount: number = this.logItem();
    console.log('');
    if (errorsCount > NONE) {
      if (errorsCount === SINGLE) {
        console.log(`Failed with 1 error`);
      } else {
        console.log(`Failed with ${errorsCount} errors`);
      }
      process.exit(ERROR_CODE);
    } else {
      console.log('Success');
    }
    return this;
  };

  public scope = (
    name: string,
    fn: (this: Readonly<TreeLogger>) => void,
  ): this => {
    this.addItem(name);
    this.indent();
    fn.bind(this)();
    this.unindent();
    return this;
  };

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  private readonly handleUncaughtException = (err: Readonly<Error>): void => {
    this.addError(err);
  };

  private readonly indent = (): this => {
    // This should throw an error if there is not a `currentItem` at this
    //   indentation level, i.e. `indent()` -> `indent()`
    this._indent++;
    return this;
  };

  private readonly logItem = (...indices: readonly number[]): number => {
    let item: Tree = this._tree;
    let prefix = '';
    const indicesCount: number = indices.length;
    const lastIndicesIndex: number = indicesCount - INDEX_OFFSET;
    for (let i = 0; i < indicesCount; i++) {
      const index: number | undefined = indices[i];
      assert(typeof index === 'number');
      const lastIndex: number = item.children.length - INDEX_OFFSET;
      if (index === lastIndex) {
        if (i === lastIndicesIndex) {
          prefix += `${SPACING}└─`;
        } else {
          prefix += `${SPACING}  `;
        }
      } else {
        if (i === lastIndicesIndex) {
          prefix += `${SPACING}├─`;
        } else {
          prefix += `${SPACING}│ `;
        }
      }

      const currentItem: Tree | undefined = item.children[index];
      assert(typeof currentItem !== 'undefined');
      item = currentItem;
    }

    console.log(`${prefix} ${item.value}`);

    const errorsCount: number = item.errors.length;
    if (errorsCount > NONE) {
      const lastErrorIndex = errorsCount - INDEX_OFFSET;

      // Technical debt: This logic is hot garbage because items were originally
      //   written in a vacuum with no concept of attached metadata like errors.
      //   Refactor this and item prefixes to make more sense.
      const getErrorPrefix = (): string => {
        const newPrefix: string = mapStringToShorten2Characters(prefix);
        const pip: string = mapStringToLast2Characters(prefix);

        // If the item's prefix was not terminal, use a pipe.
        if (pip === '├─' || pip === '│ ') {
          return `${newPrefix}│ `;
        }

        // If the item's prefix was terminal, don't use a pipe.
        return `${newPrefix}  `;
      };

      const errorPrefix: string = getErrorPrefix();

      const mapErrorIndexToPip = (errorIndex: number): string => {
        if (item.children.length > NONE || errorIndex < lastErrorIndex) {
          return '├─';
        }
        return '└─';
      };

      for (let i = 0; i < errorsCount; i++) {
        const error: Error | undefined = item.errors[i];
        assert(typeof error !== 'undefined');
        const pip: string = mapErrorIndexToPip(i);

        // `console.error` is appropriate here, but GitHub Actions flushes the
        //   log and error outputs asynchronously, causing a `console.error` to
        //   appear on the wrong line.
        console.log(
          `${errorPrefix}${SPACING}${pip} ${styles.red.open}⚠ ${error.message} ⚠${styles.red.close}`,
        );
      }
    }

    const childrenCount: number = item.children.length;
    let childrenErrorsCount = 0;
    if (childrenCount > NONE) {
      for (let i = 0; i < childrenCount; i++) {
        childrenErrorsCount += this.logItem(...indices, i);
      }
    }

    return errorsCount + childrenErrorsCount;
  };

  private readonly unindent = (): this => {
    this._indent--;
    return this;
  };
}
