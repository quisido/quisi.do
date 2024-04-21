import type TreeLogger from '@monorepo-template/tree-logger';
import assert from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type Test from '../../types/test.js';
import type VSCodeSettings from '../../types/vscode-settings.js';
import mapUnknownToError from '../../utils/map-unknown-to-error.js';
import noop from '../../utils/noop.js';
import DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS from './constants/default-required-search-exclude-keys.js';
import MISSING_SETTINGS_JSON_FILE from './constants/missing-settings-json.js';

export default class VSCodeTest implements Test {
  readonly #bannedSearchExcludeKeys: Set<string> = new Set<string>();

  readonly #requiredSearchExcludeKeys: Set<string> = new Set<string>(
    DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS,
  );

  readonly #root: string;

  public constructor(root: string = process.cwd()) {
    this.#root = root;
  }

  public get bannedSearchExcludeKeys(): Set<string> {
    return this.#bannedSearchExcludeKeys;
  }

  public get requiredSearchExcludeKeys(): Set<string> {
    return this.#requiredSearchExcludeKeys;
  }

  public get test(): (this: Readonly<TreeLogger>) => void {
    const { testSettingsJson } = this;
    return function testVSCode(this: Readonly<TreeLogger>): void {
      this.scope('settings.json', testSettingsJson);
    };
  }

  private get settingsJsonPath(): string {
    return join(this.#root, '.vscode', 'settings.json');
  }

  private get testSettingsJson(): (this: Readonly<TreeLogger>) => void {
    const getSearchExcludeTest =
      this.getSettingsJsonSearchExcludeTest.bind(this);
    return function testSettingsJson(this: Readonly<TreeLogger>): void {
      try {
        this.scope('search.exclude', getSearchExcludeTest());
      } catch (err) {
        this.addError(mapUnknownToError(err));
      }
    };
  }

  public banSearchExcludeKey(key: string): this {
    this.#bannedSearchExcludeKeys.add(key);
    return this;
  }

  public requireSearchExcludeKey(key: string): this {
    this.#requiredSearchExcludeKeys.add(key);
    return this;
  }

  public unbanSearchExcludeKey(key: string): this {
    this.#bannedSearchExcludeKeys.delete(key);
    return this;
  }

  public unrequireSearchExcludeKey(key: string): this {
    this.#requiredSearchExcludeKeys.delete(key);
    return this;
  }

  private getBannedSearchExcludeKeys(): Set<string> {
    return this.#bannedSearchExcludeKeys;
  }

  private getRequiredSearchExcludeKeys(): Set<string> {
    return this.#requiredSearchExcludeKeys;
  }

  private getSettingsJson(): VSCodeSettings {
    const path: string = this.settingsJsonPath;

    if (!existsSync(path)) {
      throw MISSING_SETTINGS_JSON_FILE;
    }

    const contents: string = readFileSync(path, 'utf8');
    return JSON.parse(contents) as VSCodeSettings;
  }

  private getSettingsJsonSearchExcludeTest(): (
    this: Readonly<TreeLogger>,
  ) => void {
    const settingsJson: VSCodeSettings = this.getSettingsJson();

    const searchExclude: Record<string, boolean> | undefined =
      settingsJson['search.exclude'];
    if (typeof searchExclude === 'undefined') {
      return noop;
    }

    const getBannedKeys = this.getBannedSearchExcludeKeys.bind(this);
    const getRequiredKeys = this.getRequiredSearchExcludeKeys.bind(this);
    return function testSettingsJsonSearchExclude(
      this: Readonly<TreeLogger>,
    ): void {
      for (const bannedKey of getBannedKeys()) {
        if (Object.hasOwn(searchExclude, bannedKey)) {
          this.addError(new Error(`Remove \`${bannedKey}\`.`));
        }
      }

      for (const requiredKey of getRequiredKeys()) {
        if (!Object.hasOwn(searchExclude, requiredKey)) {
          this.addError(new Error(`Add \`${requiredKey}\`.`));
          continue;
        }

        const excluded: boolean | undefined = searchExclude[requiredKey];
        assert(typeof excluded === 'boolean');
        if (!excluded) {
          this.addError(new Error(`Enable \`${requiredKey}\`.`));
        }
      }
    };
  }
}
