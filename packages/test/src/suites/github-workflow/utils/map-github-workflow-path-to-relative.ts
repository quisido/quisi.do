const ROOT_DIRECTORY = /^.*[\\/](?=.github[\\/]workflows)/;

export default function mapGitHubWorkflowPathToRelative(path: string): string {
  return path.replace(ROOT_DIRECTORY, '').replaceAll('\\', '/');
}
