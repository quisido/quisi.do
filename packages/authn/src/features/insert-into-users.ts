import type Gender from "../constants/gender.js";
import { INSERT_INTO_USERS_QUERY } from "../constants/queries.js";
import getNowSeconds from "../utils/get-now-seconds.js";
import getDatabase from "./shared/get-database.js";

interface Options {
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function insertIntoUsers({
  firstName,
  fullName,
  gender,
}: Options): Promise<D1Meta> {
  const db: D1Database = getDatabase();
  const registrationTimestamp: number = getNowSeconds();

  const { meta } = await db
    .prepare(INSERT_INTO_USERS_QUERY)
    .bind(firstName, fullName, gender, registrationTimestamp)
    .run();

  return meta;
}
