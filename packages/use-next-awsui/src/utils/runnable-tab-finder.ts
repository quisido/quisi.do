import type { TabsProps } from '@awsui/components-react/tabs';
import type Runnable from '../types/runnable.js';

export default class RunnableTabFinder
  implements Runnable<boolean, [TabsProps.Tab]>
{
  private _hash = '';

  private _pathname = '/';

  private _search = '';

  public constructor() {
    this.run = this.run.bind(this);
  }

  public run({ href }: Readonly<TabsProps.Tab>): boolean {
    if (typeof href !== 'string') {
      return false;
    }

    const {
      hash: tabHash,
      pathname: tabPathname,
      search: tabSearch,
    } = new URL(`https://localhost${href}`);

    return (
      this._hash === tabHash &&
      this._pathname === tabPathname &&
      this._search === tabSearch
    );
  }

  public setHash(hash: string): this {
    this._hash = hash;
    return this;
  }

  public setPathname(pathname: string): this {
    this._pathname = pathname;
    return this;
  }

  public setSearch(search: string): this {
    this._search = search;
    return this;
  }
}
