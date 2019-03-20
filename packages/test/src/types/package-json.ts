export default interface PackageJson {
  readonly dependencies?: Readonly<Record<string, string>> | undefined;
  readonly devDependencies?: Readonly<Record<string, string>> | undefined;
  readonly exports?: Readonly<Record<string, unknown>> | undefined;
  readonly files?: readonly string[] | undefined;
  readonly name: string;
  readonly peerDependencies?: Readonly<Record<string, string>> | undefined;
  readonly workspaces?: unknown;
  readonly version: string;
}
