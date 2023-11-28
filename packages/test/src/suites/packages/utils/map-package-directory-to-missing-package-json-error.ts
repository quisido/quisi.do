export default function mapPackageDirectoryToMissingPackageJsonError(
  dir: string,
): Error {
  return new Error(`Missing \`package.json\` for package directory \`${dir}\``);
}
