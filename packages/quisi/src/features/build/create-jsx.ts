import { server } from 'typescript';
import getPackageJson from '../../utils/get-package-json.js';

export default async function createJsx(): Promise<
  server.protocol.JsxEmit | undefined
> {
  const { dependencies, devDependencies } = await getPackageJson();

  if (
    typeof dependencies === 'object' &&
    dependencies !== null &&
    'react' in dependencies
  ) {
    return server.protocol.JsxEmit.ReactJSX;
  }

  if (
    typeof devDependencies === 'object' &&
    devDependencies !== null &&
    'react' in devDependencies
  ) {
    return server.protocol.JsxEmit.ReactJSX;
  }

  return undefined;
}
