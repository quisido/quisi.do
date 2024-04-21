const DIRECTORY = /^.*\//u;
const YAML_FILE_EXTENSION = /\.yml$/u;

export default function mapYamlFilePathToName(path: string): string {
  return path.replace(DIRECTORY, '').replace(YAML_FILE_EXTENSION, '');
}
