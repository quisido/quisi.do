export default interface PackageJson {
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
  readonly funding?: unknown;
  readonly name: string;
  readonly overrides?: Record<string, Record<string, string> | string>;
  readonly private?: boolean;
  readonly scripts?: Record<string, string>;
  readonly version: string;
}
