export default async function query(
  db: D1Database,
  q: string,
  ...values: readonly unknown[]
): Promise<Record<string, unknown>[]> {
  const { results } = await db.prepare(q).bind(...values).all();
  return results;
}
