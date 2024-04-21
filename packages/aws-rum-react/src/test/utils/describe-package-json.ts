import assert from 'node:assert';
import describePackageJsonBugs from './describe-package-json-bugs.js';
import describePackageJsonDevDependencies from './describe-package-json-dev-dependencies.js';
import describePackageJsonFunding from './describe-package-json-funding.js';
import describePackageJsonPublishConfig from './describe-package-json-publish-config.js';
import describePackageJsonScripts from './describe-package-json-scripts.js';
import packageJsonShouldHave from './package-json-should-have.js';

interface Options {
  readonly author: string;
  readonly domain: string;
  readonly fundingType?: string | undefined;
  readonly fundingUrl: string;
  readonly license?: string | undefined;
  readonly packageJson: string;
  readonly repo: string;
}

export default function describePackageJson({
  author,
  domain,
  fundingType = 'individual',
  fundingUrl,
  license = 'MIT',
  packageJson: packageJsonOption,
  repo,
}: Options): void {
  const packageJson: unknown = JSON.parse(packageJsonOption);
  assert(typeof packageJson === 'object');
  assert(packageJson !== null);
  assert('name' in packageJson);
  const { name: packageJsonName } = packageJson;
  assert(typeof packageJsonName === 'string');
  const expectedEmail = `${packageJsonName}@${domain}`;

  describe('package.json', (): void => {
    packageJsonShouldHave(packageJson, {
      author,
      expectedEmail,
      license,
      packageJsonName,
      repo,
    });

    describePackageJsonBugs(packageJson, expectedEmail, repo);
    describePackageJsonFunding(packageJson, fundingType, fundingUrl);
    describePackageJsonPublishConfig(packageJson);
    describePackageJsonScripts(packageJson);
    describePackageJsonDevDependencies(packageJson);
  });
}
