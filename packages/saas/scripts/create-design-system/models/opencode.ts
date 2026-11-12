import assert from 'node:assert';

import { isRecord, toString } from 'fmrs';

let partialMessage = '';

const toIcon = (tool: unknown): string => {
  switch (tool) {
    case 'edit':
      return '✏️';
    case 'write':
      return '📄';
    default:
      return '❔';
  }
};

const formatToolUse = (
  tool: unknown,
  { input, status }: Record<string | number | symbol, unknown>,
): string | undefined => {
  switch (tool) {
    case 'bash': {
      assert(isRecord(input), 'Expected input to be a record.');
      const command: string = toString(input['command']);
      if (status === 'completed') {
        return `\n⚡ ${command} ✔️\n`;
      }
      return `\n⚡ ${command} ❌\n`;
    }

    case 'edit':
    case 'write': {
      if (status !== 'completed') {
        return ' ❌\n';
      }
      assert(isRecord(input), 'Expected input to be a record.');
      return `\n${toIcon(tool)}  ${toString(input['path'])}\n`;
    }
    default:
  }
};

const formatLine = (jsonl: string): string | undefined => {
  try {
    // It's safe to use `as` here, because we are try/catching it.
    const { error, part, type } = JSON.parse(jsonl) as Record<string, unknown>;
    switch (type) {
      case 'error': {
        assert(isRecord(error), 'Expected error to be a record.');
        return `\n❌ ${toString(error)}\n`;
      }

      case 'text': {
        assert(isRecord(part), 'Expected text part to be a record.');
        return toString(part['text']);
      }

      case 'tool_use': {
        assert(isRecord(part), 'Expected tool use part to be a record.');
        const { state, tool } = part;
        assert(isRecord(state), 'Expected state to be a record.');

        return formatToolUse(tool, state);
      }

      default:
        // Events such as `step_start`, `step_finish`, and `reasoning` carry
        // no information worth surfacing.
        return undefined;
    }
  } catch (err: unknown) {
    return `\n❌ ${toString(err)}\n`;
  }
};

export const opencode = (model: string): readonly string[] => [
  'opencode',
  'run',
  '--auto',
  '--format',
  'json',
  '--model',
  model,
];

export const formatOpenCode = (message: string): string | undefined => {
  const lines: string[] = (partialMessage + message).split('\n');
  partialMessage = lines.pop() ?? '';

  const formatted: string = lines.map(formatLine).filter(Boolean).join('');
  if (formatted === '') {
    return;
  }

  return formatted;
};
