export default function mapGitHubWorkflowEventNameToPathsTypeError(
  event: string,
): Error {
  return new Error(`Expected \`on.${event}.paths\` to be an array of strings.`);
}
