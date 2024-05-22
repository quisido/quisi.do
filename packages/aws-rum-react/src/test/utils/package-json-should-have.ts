import { assert, expect, it } from "vitest";

interface Options {
  readonly author: string;
  readonly expectedEmail: string;
  readonly license?: string | undefined;
  readonly packageJsonName: string;
  readonly repo: string;
}

export default function packageJsonShouldHave(
  packageJson: object,
  {
    author,
    expectedEmail,
    license,
    packageJsonName,
    repo,
  }: Options,
): void {
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
}
