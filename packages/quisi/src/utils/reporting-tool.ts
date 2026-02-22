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

  public async run(): Promise<Report> {
    try {
      const report: Omit<Report, 'tool'> = await this.#callTool();
      if (
        report.status === 'failure' &&
        (process.env['CI'] === undefined || process.env['CI'] === '') &&
        process.stdin.isTTY
      ) {
        globalThis.console.log(
          `Press any key to RETRY... or press Q to QUIT watch mode.`,
        );
        const key: string = await new Promise((resolve): void => {
          process.stdin.setRawMode(true);
          process.stdin.once('data', (data: string) => {
            process.stdin.setRawMode(false);
            resolve(data);
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
      return {
        context: `An unexpected error occurred while executing the "${this.#toolName}" tool. This likely indicates an issue with the tool itself or the environment in which the tool is being executed, rather than with the package being analyzed.`,
        message: mapToString(err),
        status: 'failure',
        tool: this.#toolName,
      };
    }
  }
}
