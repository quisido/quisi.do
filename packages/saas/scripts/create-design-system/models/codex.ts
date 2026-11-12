import assert from 'node:assert';
import { join } from 'node:path';

import { isRecord, toString } from 'fmrs';

const PACKAGE_ROOT: string = join(import.meta.dir, '..', '..', '..');
const WORKSPACE_ROOT: string = join(PACKAGE_ROOT, '..', '..');

const toIcon = (kind: unknown): string => {
  switch (kind) {
    case 'add':
      return '📄';
    case 'delete':
      return '🗑️';
    case 'update':
      return '✏️';
    default:
      return '❔';
  }
};

const formatFileChange = (change: unknown): string | undefined => {
  assert(isRecord(change), 'Expected file change to be a record.');
  const { kind, path } = change;
  return `${toIcon(kind)}  ${toString(path)}`;
};

export const codex = (model: string): readonly string[] => [
  'codex',
  'exec',
  '--add-dir',
  join(PACKAGE_ROOT, '.cache'),
  '--add-dir',
  join(PACKAGE_ROOT, '.tests'),
  '--add-dir',
  join(PACKAGE_ROOT, 'node_modules', '.vite'),
  '--add-dir',
  join(PACKAGE_ROOT, 'node_modules', '.vite-temp'),
  '--add-dir',
  join(WORKSPACE_ROOT, 'node_modules', '.vite'),
  '--add-dir',
  join(WORKSPACE_ROOT, 'node_modules', '.vite-temp'),
  '--color',
  'always',
  '--config',
  `model="${model}"`,
  '--ephemeral',
  '--json',
  '--sandbox',
  'workspace-write',
  // '--search',
  '--strict-config',
  '-', // read prompt from stdin
];

export const formatCodex = (jsonl: string): string | undefined => {
  try {
    // It's safe to use `as` here, because we are try/catching it.
    const { item, message, type } = JSON.parse(jsonl) as Record<
      string,
      unknown
    >;

    switch (type) {
      case 'error':
        return `\n❌ ${toString(message)}\n`;

      case 'item.completed': {
        if (!isRecord(item)) {
          return;
        }
        const { type: itemType } = item;
        switch (itemType) {
          case 'agent_message':
            return toString(item['text']);

          case 'command_execution': {
            if (item['exit_code'] === 0) {
              return ' ✔️\n';
            }
            return ' ❌\n';
          }

          case 'error':
            return `\n❌ ${toString(message)}\n`;

          case 'file_change': {
            assert(
              Array.isArray(item['changes']),
              'Expected changes to be an array.',
            );

            const formatted: readonly (string | undefined)[] = item['changes']
              .map(formatFileChange)
              .filter(Boolean);
            if (formatted.length === 0) {
              return;
            }
            return `\n${formatted.join('\n')}\n`;
          }
          case 'web_search':
            return `\n🔎 ${toString(item['query'])}\n`;

          default:
            return;
        }
      }

      case 'item.started': {
        assert(isRecord(item), 'Expected item to be a record.');
        switch (item['type']) {
          case 'command_execution':
            return `\n⚡ ${toString(item['command'])}...`;

          default:
            return;
        }
      }

      default:
        return undefined;
    }
  } catch (err: unknown) {
    return `\n❌ ${toString(err)}\n`;
  }
};
