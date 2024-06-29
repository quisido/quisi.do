import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import validateRecord from './validate-record.js';

export default function mapYamlPathToJson(
  path: string,
): Record<string, unknown> {
  const yaml: string = readFileSync(path, 'utf8');
  const workflow: unknown = load(yaml);
  return validateRecord(workflow);
}
