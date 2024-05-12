const ARRAY_INDEX_OFFSET = 1;

interface Options {
  readonly page: number;
  readonly rowsPerPage: number;
}

export default class Paginator {
  readonly #page: number;

  readonly #rowsPerPage: number;

  public constructor({ page, rowsPerPage }: Options) {
    this.#page = page;
    this.#rowsPerPage = rowsPerPage;
    this.paginate = this.paginate.bind(this);
  }

  private get end(): number {
    return this.start + this.#rowsPerPage;
  }

  private get start(): number {
    return (this.#page - ARRAY_INDEX_OFFSET) * this.#rowsPerPage;
  }

  public paginate<T>(arr: readonly T[]): readonly T[] {
    return arr.slice(this.start, this.end);
  }
}
