import type { Linter } from 'eslint';

const reduceToRecord = (
  record: Linter.RulesRecord,
  config: Linter.Config,
): Linter.RulesRecord => {
  return {
    ...record,
    ...(config.rules as Linter.RulesRecord),
  };
};

export default function mapFlatConfigToRulesRecord(
  configs: readonly Linter.Config[],
): Linter.RulesRecord {
  return configs.reduce(reduceToRecord, {});
}
