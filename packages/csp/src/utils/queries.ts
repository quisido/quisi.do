import type { Tuple } from '../types/type.js';

const mapResultToResults = ({
  results,
}: D1Result<Record<string, unknown>>): Record<string, unknown>[] => results;

export default async function queries<N extends number>(
  db: D1Database,
  queries: Tuple<readonly [string, ...(readonly unknown[])], N>,
): Promise<Tuple<Record<string, unknown>[], N>> {
  const mapQueryToPreparedStatement = ([queryStr, ...values]: readonly [
    string,
    ...(readonly unknown[]),
  ]): D1PreparedStatement => db.prepare(queryStr).bind(...values);

  const preparedStatements: D1PreparedStatement[] = queries.map(
    mapQueryToPreparedStatement,
  );
  const results = await db.batch<Record<string, unknown>>(preparedStatements);
  return results.map(mapResultToResults) as Tuple<Record<string, unknown>[], N>;
}
