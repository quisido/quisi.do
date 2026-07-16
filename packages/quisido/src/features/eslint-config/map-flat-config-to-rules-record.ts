import type { Config, RuleConfig } from '@eslint/config-helpers';

export type RulesRecord = Partial<Record<string, RuleConfig>>;

const reduceToRecord = (
  record: RulesRecord,
  config: Config,
): RulesRecord => ({
  ...record,
  ...config.rules,
});

export default function mapFlatConfigToRulesRecord(
  configs: readonly Partial<Record<'rules', RulesRecord>>[],
): RulesRecord {
  return configs.reduce(reduceToRecord, {});
}
