import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import mapJsonToString from './map-json-to-string.js';
import mapPackageNameToContents from './map-package-name-to-contents.js';
import mapPackageNameToJson from './map-package-name-to-json.js';

const CWD = process.cwd();
const MKDIR_OPTIONS = {
  recursive: true,
};

const reduceFileNamesToRecord = (record, fileName) => {
  const filePath = `./${fileName}`;
  return {
    ...record,
    [filePath]: filePath,
  };
};

export default function pnp(name, exportFileNames = []) {
  mkdirSync(`./node_modules/${name}`, MKDIR_OPTIONS);
  const packagePath = join(CWD, `./node_modules/${name}/package.json`);

  const json = mapPackageNameToJson(name);
  const jsonStr = mapJsonToString({
    ...json,
    exports: exportFileNames.reduce(reduceFileNamesToRecord, json.exports),
  });
  writeFileSync(packagePath, jsonStr);

  const contents = mapPackageNameToContents(name);
  const indexPath = join(CWD, `./node_modules/${name}/index.cjs`);
  writeFileSync(indexPath, contents);

  for (const exportFileName of exportFileNames) {
    const exportContents = mapPackageNameToContents(
      `${name}/${exportFileName}`,
    );
    const exportFilePath = join(
      CWD,
      `./node_modules/${name}/${exportFileName}`,
    );
    writeFileSync(exportFilePath, exportContents);
  }
}
