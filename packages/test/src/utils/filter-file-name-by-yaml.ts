import YAML_FILENAME from '../constants/yaml-filename.js';

export default function filterFileNameByYaml(fileName: string): boolean {
  return YAML_FILENAME.test(fileName);
}
