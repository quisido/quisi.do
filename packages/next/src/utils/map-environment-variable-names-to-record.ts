import reduceEnvironmentVariableNamesToRecord from './reduce-environment-variable-names-to-record.js';

export default function mapEnvironmentVariableNamesToRecord(
  names: readonly string[],
): Record<string, string | undefined> {
  return names.reduce(reduceEnvironmentVariableNamesToRecord, {});
}
