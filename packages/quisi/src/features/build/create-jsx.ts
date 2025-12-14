interface Options {
  readonly dependencies: unknown;
  readonly devDependencies: unknown;
}

export default function createJsx({
  dependencies,
  devDependencies,
}: Options): string | undefined {
  if (
    typeof dependencies === 'object' &&
    dependencies !== null &&
    'react' in dependencies
  ) {
    return 'react-jsx';
  }

  if (
    typeof devDependencies === 'object' &&
    devDependencies !== null &&
    'react' in devDependencies
  ) {
    return 'react-jsx';
  }

  return undefined;
}
