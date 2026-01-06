import mapPathToPackageJson from './map-path-to-package-json.js';

export default async function getPackageJson(): Promise<
  Record<string, unknown>
> {
  const cwd: string = process.cwd();
  return await mapPathToPackageJson(cwd);
}
