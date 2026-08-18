import isRecord from './is-record.js';

export enum Model {
  Luna = 'luna',
  Sol = 'sol',
  Terra = 'terra',
}

type ModelCommand = (options: ModelCommandOptions) => readonly string[];

export interface ModelCommandOptions {
  readonly workingDirectory: string;
  readonly writeDirectories: readonly string[];
}

export interface ModelOptions {
  readonly command: ModelCommand;
  readonly format: (message: string) => string | undefined;
  readonly parallel: boolean;
}

const codex =
  (model: string): ModelCommand =>
  ({
    workingDirectory,
    writeDirectories,
  }: ModelCommandOptions): readonly string[] => [
    'codex',
    'exec',
    ...writeDirectories.flatMap((dir: string): readonly string[] => [
      `--add-dir`,
      dir,
    ]),
    // '--approve-for-me', // cannot be used with --sandbox
    // '--ask-for-approval',
    // 'never',
    '--cd',
    workingDirectory,
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

const toCodexFileChangeKindSymbol = (kind: unknown): string => {
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

const codexJson = (jsonl: string): string | undefined => {
  try {
    // It's safe to use `as` here, because we are try/catching it.
    const { item, message, type } = JSON.parse(jsonl) as Record<
      string,
      unknown
    >;
    switch (type) {
      case 'error':
        return `\n❌ ${String(message)}\n`;

      case 'item.completed': {
        if (!isRecord(item)) {
          return;
        }
        switch (item['type']) {
          case 'agent_message':
            return String(item['text']);
          case 'command_execution': {
            if (item['exit_code'] === 0) {
              return ' ✔️\n';
            }
            return ' ❌\n';
          }
          case 'error':
            return `\n❌ ${String(message)}\n`;
          case 'file_change': {
            if (!Array.isArray(item['changes'])) {
              return;
            }

            const toFormatted = (change: unknown): string | undefined => {
              if (!isRecord(change)) {
                return;
              }

              return `${toCodexFileChangeKindSymbol(change['kind'])}  ${String(change['path'])}`;
            };

            const formatted: readonly (string | undefined)[] = item['changes']
              .map(toFormatted)
              .filter(Boolean);
            if (formatted.length === 0) {
              return;
            }
            return `\n${formatted.join('\n')}\n`;
          }
          case 'web_search':
            return `\n🔎 ${String(item['query'])}\n`;
          default:
            return;
        }
      }

      case 'item.started': {
        if (!isRecord(item)) {
          return;
        }
        switch (item['type']) {
          case 'command_execution':
            return `\n⚡ ${String(item['command'])}...`;
          default:
            return;
        }
      }

      default:
        return undefined;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return `\n❌ ${err.message}\n`;
    }
    return `\n❌ ${String(err)}\n`;
  }
  /*
{"type":"thread.started","thread_id":"0199a213-81c0-7800-8aa1-bbab2a035a53"}
{"type":"turn.started"}
{"type":"item.started","item":{"id":"item_1","type":"command_execution","command":"bash -lc ls","status":"in_progress"}}
{"type":"item.completed","item":{"id":"item_3","type":"agent_message","text":"Repo contains docs, sdk, and examples directories."}}
{"type":"turn.completed","usage":{"input_tokens":24763,"cached_input_tokens":24448,"output_tokens":122,"reasoning_output_tokens":0}}
*/
};

export const MODEL_OPTIONS: Record<Model, ModelOptions> = {
  [Model.Luna]: {
    command: codex('gpt-5.6-luna'),
    format: codexJson,
    parallel: false,
  },
  [Model.Sol]: {
    command: codex('gpt-5.6-sol'),
    format: codexJson,
    parallel: false,
  },
  [Model.Terra]: {
    command: codex('gpt-5.6-terra'),
    format: codexJson,
    parallel: false,
  },
};

export const isModel = (value: string): value is Model =>
  Object.hasOwn(MODEL_OPTIONS, value);
