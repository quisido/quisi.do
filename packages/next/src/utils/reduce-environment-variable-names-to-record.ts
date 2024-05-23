import validateString from "./validate-string.js";

export default function reduceEnvironmentVariableNamesToRecord(
  record: Record<string, string | undefined>,
  name: string,
): Record<string, string | undefined> {
  return {
    ...record,
    [name]: validateString(process.env[name]),
  };
}
