export default function mapWorkspaceGlobToEndsWithError(glob: string): Error {
  return new Error(`Expected workspace glob \`${glob}\` to end with \`/*\``);
}
