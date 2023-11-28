import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface Options {
  readonly author: string;
  readonly domain: string;
  readonly fundingType?: string | undefined;
  readonly fundingUrl: string;
  readonly license?: string | undefined;
  readonly packageJson: string;
  readonly repo: string;
}

function describePackageJson({
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
    it('should have the expected author', (): void => {
      assert('author' in packageJson);
      expect(packageJson.author).toBe(`${author} <${expectedEmail}>`);
    });

    it('should have a description', (): void => {
      assert('description' in packageJson);
    });

    it('should have the expected homepage', (): void => {
      assert('homepage' in packageJson);
      expect(packageJson.homepage).toBe(
        `https://github.com/${repo}/tree/main/packages/${packageJsonName}#readme`,
      );
    });

    it('should have the expected licensed', (): void => {
      assert('license' in packageJson);
      expect(packageJson.license).toBe(license);
    });

    it('should have a main entrypoint', (): void => {
      assert('main' in packageJson);
      expect(packageJson.main).toBe('./dist/index.js');
    });

    it('should have the expected repository', (): void => {
      assert('repository' in packageJson);
      expect(packageJson.repository).toBe(`github:${repo}`);
    });

    it('should be a module', (): void => {
      assert('type' in packageJson);
      expect(packageJson.type).toBe('module');
    });

    it('should have a TypeScript definition', (): void => {
      assert('types' in packageJson);
      expect(packageJson.types).toBe('./dist/index.d.ts');
    });

    describe('bugs', (): void => {
      assert('bugs' in packageJson);
      const { bugs } = packageJson;
      assert(typeof bugs === 'object');
      assert(bugs !== null);

      it('should have the expected email for bugs', (): void => {
        assert('email' in bugs);
        expect(bugs.email).toBe(expectedEmail);
      });

      it('should have the expected URL for bugs', (): void => {
        assert('url' in bugs);
        expect(bugs.url).toBe(`https://github.com/${repo}/issues`);
      });
    });

    describe('funding', (): void => {
      assert('funding' in packageJson);
      const { funding } = packageJson;
      assert(typeof funding === 'object');
      assert(funding !== null);

      it('should have the expected funding type', (): void => {
        assert('type' in funding);
        expect(funding.type).toBe(fundingType);
      });

      it('should have the expected funding URL', (): void => {
        assert('url' in funding);
        expect(funding.url).toBe(fundingUrl);
      });
    });

    describe('publishConfig', (): void => {
      assert('publishConfig' in packageJson);
      const { publishConfig } = packageJson;
      assert(typeof publishConfig === 'object');
      assert(publishConfig !== null);

      it('should have public access', (): void => {
        assert('access' in publishConfig);
        expect(publishConfig.access).toBe('public');
      });
    });

    describe('scripts', (): void => {
      assert('scripts' in packageJson);
      const { scripts } = packageJson;
      assert(typeof scripts === 'object');
      assert(scripts !== null);

      it('should have an AreTheTypesWrong script', (): void => {
        assert('attw' in scripts);
        expect(scripts.attw).toBe('attw');
      });

      it('should have ESLint scripts', (): void => {
        assert('eslint' in scripts);
        expect(scripts.eslint).toBe(
          "eslint '**/*' --format @microsoft/eslint-formatter-sarif --output-file ../../sarif/aws-rum-react.sarif",
        );

        assert('eslint:fix' in scripts);
        expect(scripts['eslint:fix']).toBe("eslint '**/*' --fix");
      });

      it('should have Jest scripts', (): void => {
        assert('jest' in scripts);
        expect(scripts.jest).toBe('jest --config jest.config.cjs');

        assert('jest:watch' in scripts);
        expect(scripts['jest:watch']).toBe(
          'jest --config jest.config.cjs --watch',
        );
      });

      it('should have prepack scripts', (): void => {
        assert('prepack' in scripts);
        expect(scripts.prepack).toBe('yarn run tsc');
      });

      it('should have prepublish scripts', (): void => {
        assert('prepublish' in scripts);
        expect(scripts.prepublish).toBe(
          'concurrently --kill-others-on-fail --names attw,eslint,jest "yarn run attw" "yarn run eslint" "yarn run jest"',
        );
      });

      /*
      it('should have TypeScript compiler scripts', (): void => {
        assert('tsc:prepack' in scripts);
        expect(scripts['tsc:prepack']).toBe(
          'tsc --project tsconfig.prepack.json',
        );
      });
      */
    });

    describe('devDependencies', (): void => {
      assert('devDependencies' in packageJson);
      const { devDependencies } = packageJson;
      assert(typeof devDependencies === 'object');
      assert(devDependencies !== null);

      it('should have the expected developer dependencies', (): void => {
        assert('@arethetypeswrong/cli' in devDependencies);
        assert('@microsoft/eslint-formatter-sarif' in devDependencies);
        assert('@types/node' in devDependencies);
        assert('concurrently' in devDependencies);
        assert('eslint' in devDependencies);
        // assert("eslint-plugin-jsx-a11y" in devDependencies);
        // assert("eslint-plugin-react" in devDependencies);
        // assert("eslint-plugin-react-hooks" in devDependencies);
        assert('jest' in devDependencies);
        assert('jest-environment-jsdom' in devDependencies);
        assert('tslib' in devDependencies);
        assert('typescript' in devDependencies);
      });
    });
  });
}

const packageJsonPath: string = join(__dirname, '..', 'package.json');

describePackageJson({
  author: 'quisi.do',
  domain: 'quisi.do',
  fundingUrl: 'https://github.com/sponsors/quisido',
  packageJson: readFileSync(packageJsonPath).toString(),
  repo: 'quisido/quisi.do',
});
