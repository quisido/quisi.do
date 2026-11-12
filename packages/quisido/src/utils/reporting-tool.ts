import process from 'node:process';

import {
  type FailureReport,
  type Report,
  type SkippedReport,
  type SuccessReport,
} from '../types/report.js';
import getKey from './get-key.js';
import toString from './to-string.js';

// Press F to FIX with AI.
const WATCH_MODE_INSTRUCTIONS = `
Press F to FIX with AI.
Press R to RETRY.
Press any other key to SKIP this tool.
`;

export type ReportingToolResult =
  | Omit<FailureReport, 'tool'>
  | Omit<SkippedReport, 'tool'>
  | Omit<SuccessReport, 'tool'>;

/**
 * This class will execute a tool call, but handle any unexpected errors that
 * occur, ensuring that a valid Report is generated.
 */
export default class ReportingTool<
  Options extends readonly unknown[] = readonly never[],
> {
  #callTool: (...options: Options) => Promise<ReportingToolResult>;
  #env: NodeJS.ProcessEnv = process.env;
  #isProgressLog = false;
  #stdin: NodeJS.ReadStream = process.stdin;
  #stdout: NodeJS.WriteStream = process.stdout;
  #toolName: string;

  public constructor(
    toolName: string,
    callTool: (...options: Options) => Promise<ReportingToolResult>,
  ) {
    this.#callTool = callTool;
    this.#toolName = toolName;
  }

  #clearLine(): void {
    // `clearLine` is only supported in TTY environments.
    if (!this.#stdout.isTTY) {
      return;
    }

    this.#stdout.clearLine(0);
    this.#stdout.cursorTo(0);
  }

  get #isCI(): boolean {
    return this.#env['CI'] !== undefined && this.#env['CI'] !== '';
  }

  get #isTTY(): boolean {
    return !this.#isCI && this.#stdin.isTTY;
  }

  public logError(message: string): void {
    this.#isProgressLog = false;
    this.#stdout.write(`[${this.#toolName}] ${message}`);
  }

  public logInfo(message: string): void {
    this.#isProgressLog = false;
    this.#stdout.write(`[${this.#toolName}] ${message}`);
  }

  #progress(message: string): void {
    if (this.#isProgressLog) {
      this.#clearLine();
    }

    this.#isProgressLog = true;
    this.#stdout.write(`[${this.#toolName}] ${message}`);
  }

  public async run(...options: Options): Promise<Report> {
    this.#progress('⏳');

    try {
      const result: ReportingToolResult = await this.#callTool(...options);

      switch (result.status) {
        case 'failure': {
          this.#progress('❌');
          if (!this.#isTTY) {
            break;
          }

          this.logError([result.context, result.message].join('\n'));
          this.#stdout.write(WATCH_MODE_INSTRUCTIONS);
          this.#stdout.unref();

          const key: string = await getKey(this.#stdin);
          switch (key.toLowerCase()) {
            case 'f': {
              this.logInfo('This feature is not yet implemented.');
              break;
            }

            case 'r':
              return await this.run(...options);
          }
          break;
        }

        case 'skipped':
          this.#progress(`⏭️  Skipped: ${result.message}`);
          break;

        case 'success':
          this.#progress('✔️');
          this.#stdout.write('\n');
          break;
      }

      return {
        ...result,
        tool: this.#toolName,
      };
    } catch (err: unknown) {
      this.#progress('❌');
      return {
        context: `An unexpected error occurred while executing the "${this.#toolName}" tool. This likely indicates an issue with the tool itself or the environment in which the tool is being executed, rather than with the package being analyzed.`,
        message: toString(err),
        status: 'failure',
        tool: this.#toolName,
      };
    }
  }
}
