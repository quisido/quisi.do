import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const PACKAGE_JSON_PATH: string = join(process.cwd(), 'package.json');

const getPackageJson = (): object => {
  try {
    const jsonStr: string = readFileSync(PACKAGE_JSON_PATH, 'utf-8');
    const json: unknown = JSON.parse(jsonStr);
    assert(typeof json === 'object');
    assert(json !== null);
    return json;
  } catch (err: unknown) {
    throw new Error(`Invalid package.json file: ${PACKAGE_JSON_PATH}`);
  }
};

const PACKAGE_JSON: object = getPackageJson();
export default PACKAGE_JSON;
