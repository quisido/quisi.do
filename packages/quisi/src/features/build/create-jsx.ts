import { JsxEmit } from 'typescript';
import getPackageJson from '../../utils/get-package-json.js';

export default async function createJsx(): Promise<JsxEmit | undefined> {
  const { dependencies, devDependencies } = await getPackageJson();

  if (
    typeof dependencies === 'object' &&
    dependencies !== null &&
    'react' in dependencies
  ) {
    return JsxEmit.ReactJSX; // 'react-jsx'
  }

  if (
    typeof devDependencies === 'object' &&
    devDependencies !== null &&
    'react' in devDependencies
  ) {
    return JsxEmit.ReactJSX; // 'react-jsx'
  }

  return undefined;
}
