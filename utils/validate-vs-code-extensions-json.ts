import assert from 'node:assert/strict';
import type VSCodeExtensionsJson from '../types/vs-code-extensions-json.js';
import isString from './is-string.js';

export default function validateVSCodeExtensionsJson(
  contents: unknown,
): VSCodeExtensionsJson {
  assert(
    typeof contents === 'object' && contents !== null,
    'Invalid JSON structure',
  );

  assert(
    'recommendations' in contents,
    'Missing VS Code extension recommendations.',
  );

  const { recommendations } = contents;
  assert(
    Array.isArray(recommendations),
    'Expected VS Code extension recommendations to be an array.',
  );

  assert(
    recommendations.every(isString),
    'Expected all VS Code extension recommendations to be strings.',
  );

  return {
    ...contents,
    recommendations,
  };
}
