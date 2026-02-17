import { Model } from './model.js';
import type Task from './task.js';

const GOAL = `
Summarize the Vitest report with these details FOR EACH test failure:

1. The error message and, if known, the file path and line number where it was
    thrown.
2. A brief description of the application state expected by the test.
3. A brief description of the actual application state based on the error
    message, common reasons for Vitest to encounter this error, or any other
    relevant information from the report.
4. An actionable step for the developer to take to fix the issue.
`.trim();

export default class VitestTask implements Task {
  public readonly data: string;
  public readonly dataType = 'json';
  public readonly goal: string = GOAL;
  public readonly model: Model = Model.Llama3_1;
  public readonly tools: readonly never[] = [];

  public constructor(data: unknown) {
    this.data = JSON.stringify(data);
  }
}
