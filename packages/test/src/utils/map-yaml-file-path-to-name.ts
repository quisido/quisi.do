const DIRECTORY = /^.*\//;
const YAML_FILE_EXTENSION = /\.yml$/;

export default function mapYamlFilePathToName(path: string): string {
  return path.replace(DIRECTORY, '').replace(YAML_FILE_EXTENSION, '');
}
