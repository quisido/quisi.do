import { type Config, type RuleConfig } from '@eslint/config-helpers';

const reduceToRecord = (record: RulesRecord, config: Config): RulesRecord => ({
  ...record,
  ...config.rules,
});

export type RulesRecord = Partial<Record<string, RuleConfig>>;

export default function mapFlatConfigToRulesRecord(
  configs: readonly Partial<Record<'rules', RulesRecord>>[],
): RulesRecord {
  return configs.reduce(reduceToRecord, {});
}
