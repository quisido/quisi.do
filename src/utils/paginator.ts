const ARRAY_INDEX_OFFSET = 1;

interface Options {
  readonly page: number;
  readonly rowsPerPage: number;
}

export default class Paginator {
  public constructor({ page, rowsPerPage }: Options) {
    this._page = page;
    this._rowsPerPage = rowsPerPage;
    this.paginate = this.paginate.bind(this);
  }

  public paginate<T>(arr: readonly T[]): readonly T[] {
    return arr.slice(this.start, this.end);
  }

  private readonly _page: number;

  private readonly _rowsPerPage: number;

  private get end(): number {
    return this.start + this._rowsPerPage;
  }

  private get start(): number {
    return (this._page - ARRAY_INDEX_OFFSET) * this._rowsPerPage;
  }
}
