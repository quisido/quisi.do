import {
  type FailureReport,
  type Report,
  type SkippedReport,
  type SuccessReport,
} from '../types/report.js';
import getKey from './get-key.js';
import toString from './to-string.js';

export type ReportingToolResult =
  | Omit<FailureReport, 'tool'>
  | Omit<SkippedReport, 'tool'>
  | Omit<SuccessReport, 'tool'>;

// Press F to FIX with AI.
const WATCH_MODE_INSTRUCTIONS = `
Press R to RETRY.
Press any other key to SKIP this tool.
`;

/**
 * This class will execute a tool call, but handle any unexpected errors that
 * occur, ensuring that a valid Report is generated.
 */
export default class ReportingTool<
  Options extends readonly unknown[] = readonly never[],
> {
  #callTool: (...options: Options) => Promise<ReportingToolResult>;
  #env: NodeJS.ProcessEnv = process.env;
  #stdin: NodeJS.ReadStream = process.stdin;
  #toolName: string;

  public constructor(
    toolName: string,
    callTool: (...options: Options) => Promise<ReportingToolResult>,
  ) {
    this.#callTool = callTool;
    this.#toolName = toolName;
  }

  get #isCI(): boolean {
    return this.#env['CI'] !== undefined && this.#env['CI'] !== '';
  }

  get #isTTY(): boolean {
    return !this.#isCI && this.#stdin.isTTY;
  }

  public logError(message: string): void {
    globalThis.console.error(`[${this.#toolName}] ${message}`);
  }

  public logInfo(message: string): void {
    globalThis.console.info(`[${this.#toolName}] ${message}`);
  }

  public async run(...options: Options): Promise<Report> {
    this.logInfo('⏳');

    try {
      const result: ReportingToolResult = await this.#callTool(...options);

      switch (result.status) {
        case 'failure':
          this.logInfo('❌');
          if (this.#isTTY) {
            this.logError([result.context, result.message].join('\n'));
            process.stdout.write(WATCH_MODE_INSTRUCTIONS);
            process.stdout.unref();

            const key: string = await getKey(this.#stdin);
            if (key.toLowerCase() === 'r') {
              return await this.run(...options);
            }
          }
          break;

        case 'skipped':
          this.logInfo(`⏭️  Skipped: ${result.message}`);
          break;

        case 'success':
          this.logInfo('✔️');
          break;
      }

      return {
        ...result,
        tool: this.#toolName,
      };
    } catch (err: unknown) {
      this.logInfo('❌');
      return {
        context: `An unexpected error occurred while executing the "${this.#toolName}" tool. This likely indicates an issue with the tool itself or the environment in which the tool is being executed, rather than with the package being analyzed.`,
        message: toString(err),
        status: 'failure',
        tool: this.#toolName,
      };
    }
  }
}
