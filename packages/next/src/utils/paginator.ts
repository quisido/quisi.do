const ARRAY_INDEX_OFFSET = 1;

interface Options {
  readonly page: number;
  readonly rowsPerPage: number;
}

export default class Paginator {
  private readonly _page: number;

  private readonly _rowsPerPage: number;

  public constructor({ page, rowsPerPage }: Options) {
    this._page = page;
    this._rowsPerPage = rowsPerPage;
    this.paginate = this.paginate.bind(this);
  }

  private get end(): number {
    return this.start + this._rowsPerPage;
  }

  private get start(): number {
    return (this._page - ARRAY_INDEX_OFFSET) * this._rowsPerPage;
  }

  public paginate<T>(arr: readonly T[]): readonly T[] {
    return arr.slice(this.start, this.end);
  }
}
