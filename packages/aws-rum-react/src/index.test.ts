import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import describePackageJson from './test/utils/describe-package-json.js';

const packageJsonPath: string = join(__dirname, '..', 'package.json');
describePackageJson({
  author: 'quisi.do',
  domain: 'quisi.do',
  fundingUrl: 'https://github.com/sponsors/quisido',
  packageJson: readFileSync(packageJsonPath).toString(),
  repo: 'quisido/quisi.do',
});
