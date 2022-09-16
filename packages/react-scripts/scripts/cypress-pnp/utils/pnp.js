import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import mapJsonToString from './map-json-to-string.js';
import mapPackageNameToContents from './map-package-name-to-contents.js';
import mapPackageNameToJson from './map-package-name-to-json.js';

const CWD = process.cwd();
const MKDIR_OPTIONS = {
  recursive: true,
};

export default function pnp(name) {
  mkdirSync(`./node_modules/${name}`, MKDIR_OPTIONS);

  const json = mapPackageNameToJson(name);
  const packagePath = join(CWD, `./node_modules/${name}/package.json`);

  const jsonStr = mapJsonToString(json);
  writeFileSync(packagePath, jsonStr);

  const contents = mapPackageNameToContents(name);
  const indexPath = join(CWD, `./node_modules/${name}/index.cjs`);
  writeFileSync(indexPath, contents);
}
