import type Report from '../types/report.js';
import mapToString from './map-to-string.js';

/**
 *   This class will execute a tool call, but handle any unexpected errors that
 * occur, ensuring that a valid Report is generated.
 */
export default class ReportingTool {
  #callTool: () => Promise<Omit<Report, 'tool'>>;
  #toolName: string;

  public constructor(
    toolName: string,
    callTool: () => Promise<Omit<Report, 'tool'>>,
  ) {
    this.#callTool = callTool;
    this.#toolName = toolName;
  }

  public logError(message: string): void {
    globalThis.console.error(`[quisi] [${this.#toolName}] ${message}`);
  }

  public logInfo(message: string): void {
    globalThis.console.info(`[quisi] [${this.#toolName}] ${message}`);
  }

  public async run(): Promise<Report> {
    this.logInfo('⏳');

    try {
      const report: Omit<Report, 'tool'> = await this.#callTool();

      switch (report.status) {
        case 'failure':
          this.logInfo('❌');
          break;

        case 'skipped':
          this.logInfo(`⏭️  ${report.message ?? '(skipped)'}`);
          break;

        case 'success':
          this.logInfo('✔️');
          break;
      }

      if (
        report.status === 'failure' &&
        (process.env['CI'] === undefined || process.env['CI'] === '') &&
        process.stdin.isTTY
      ) {
        this.logError([report.context, report.message].join('\n'));

        process.stdout.write(`
Press Q to QUIT watch mode.
Press any other key to RETRY.
`);
        process.stdout.unref();

        const key: string = await new Promise((resolve): void => {
          process.stdin.setRawMode(true);
          process.stdin.once('data', (data: Buffer<ArrayBuffer>) => {
            process.stdin.setRawMode(false);
            process.stdin.unref();
            resolve(data.toString('utf8'));
          });
        });

        if (key.toLowerCase() !== 'q') {
          return await this.run();
        }
      }

      return {
        ...report,
        tool: this.#toolName,
      };
    } catch (err: unknown) {
      this.logInfo('❌');
      return {
        context: `An unexpected error occurred while executing the "${this.#toolName}" tool. This likely indicates an issue with the tool itself or the environment in which the tool is being executed, rather than with the package being analyzed.`,
        message: mapToString(err),
        status: 'failure',
        tool: this.#toolName,
      };
    }
  }
}
