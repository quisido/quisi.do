import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import createExportContents from './create-export-contents.js';
import mapJsonToString from './map-json-to-string.js';
import mapPackageNameToJson from './map-package-name-to-json.js';

const CWD = process.cwd();
const MKDIR_OPTIONS = {
  recursive: true,
};

export default function pnp(name, exports = {}) {
  mkdirSync(`./node_modules/${name}`, MKDIR_OPTIONS);
  const packageDirectory = join(CWD, 'node_modules', name);
  const packagePath = join(packageDirectory, 'package.json');

  const json = mapPackageNameToJson(name);
  for (const [_export, path] of Object.entries(exports)) {
    const exportPath = join(packageDirectory, path);
    const exportContents = createExportContents(name, _export);
    writeFileSync(exportPath, exportContents);
    json.exports[`./${_export}`] = `./${path}`;
  }
  const jsonStr = mapJsonToString(json);
  writeFileSync(packagePath, jsonStr);

  const contents = createExportContents(name);
  const indexPath = join(CWD, `./node_modules/${name}/index.js`);
  writeFileSync(indexPath, contents);
}
