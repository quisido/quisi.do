import { type Linter } from 'eslint';

const mapEntryToConfig = ([rule, files]: readonly [
  string,
  readonly string[],
]): Linter.Config => {
  return {
    files: [...files],
    rules: {
      [rule]: 'off',
    },
  };
};

export default function disableRulesForFiles(
  record: Record<string, readonly string[]>,
): readonly Linter.Config[] {
  return Object.entries(record).map(mapEntryToConfig, []);
}
