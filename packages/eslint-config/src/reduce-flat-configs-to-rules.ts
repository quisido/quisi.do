import type { Linter } from 'eslint';

export default function reduceFlatConfigsToRules<T extends Linter.RulesRecord>(
  previousRules: T,
  { rules: nextRules }: Linter.FlatConfig,
): T {
  return {
    ...previousRules,
    ...nextRules,
  };
}
