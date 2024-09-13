import { TestD1PreparedStatement } from "./d1-prepared-statement.js";
import unimplementedMethod from "./unimplemented-method.js";

interface Result {
  readonly error?: Error | undefined;
  readonly lastRowId?: number | undefined;
  readonly results?: readonly unknown[] | undefined;
}

export default class TestD1Database implements D1Database {
  public batch: D1Database['batch'] = unimplementedMethod;
  public dump: D1Database['dump'] = unimplementedMethod;
  public exec: D1Database['exec'] = unimplementedMethod;
  readonly #preparedStatements: Map<string, TestD1PreparedStatement> = new Map();
  readonly #queries: Map<string, Result> = new Map();

  public constructor(queries: Record<string, Result>) {
    for (const [query, result] of Object.entries(queries)) {
      this.#queries.set(query, result);
    }
  }

  public expectToHaveQueried = (
    query: string,
    values: readonly (null | number | string)[],
  ): void => {
    const statement: TestD1PreparedStatement | undefined = this.#preparedStatements.get(query);
    if (typeof statement === 'undefined') {
      throw new Error(`Expected query to have been prepared:
${query}`);
    }

    const { expectToHaveBound } = statement;
    expectToHaveBound(...values);
  };

  public prepare = (query: string): D1PreparedStatement => {
    const result: Result | undefined = this.#queries.get(query);
    if (typeof result === 'undefined') {
      throw new Error(`Expected query to be mocked:
${query}`);
    }

    const statement = new TestD1PreparedStatement(result);
    this.#preparedStatements.set(query, statement);
    return statement;
  };
}
