import { type Linter } from 'eslint';

export default function reduceConfigsToRules<T extends Linter.RulesRecord>(
  previousRules: T,
  { rules: nextRules }: Linter.Config,
): T {
  return {
    ...previousRules,
    ...nextRules,
  };
}
