import getPackageJson from '../../utils/get-package-json.js';

export default async function createJsx(): Promise<'react-jsx' | undefined> {
  const { dependencies, devDependencies } = await getPackageJson();

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
