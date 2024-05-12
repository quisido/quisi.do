export default async function query(
  db: D1Database,
  queryStr: string,
  ...values: readonly unknown[]
): Promise<Record<string, unknown>[]> {
  const { results } = await db.prepare(queryStr).bind(...values).all();
  return results;
}
