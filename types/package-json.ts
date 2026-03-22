export default interface PackageJson {
  readonly bin?: Partial<Record<string, string>> | string;
  readonly dependencies?: Partial<Record<string, string>>;
  readonly devDependencies?: Partial<Record<string, string>>;
  readonly funding?: unknown;
  readonly name: string;
  readonly overrides?: Record<string, Record<string, string> | string>;
  readonly private?: boolean;
  readonly scripts?: Record<string, string>;
  readonly version: string;
}
