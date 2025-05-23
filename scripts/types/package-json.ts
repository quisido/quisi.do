export default interface PackageJson {
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
  readonly name: string;
  readonly private?: boolean;
  readonly version: string;
}
