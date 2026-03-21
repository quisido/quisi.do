export type Report = FailureReport | SkippedReport | SuccessReport;

export interface FailureReport {
  readonly context: string;
  readonly message: string;
  readonly path?: string | undefined;
  readonly status: 'failure';
  readonly tool: string;
}

export interface SkippedReport {
  readonly message: string;
  readonly status: 'skipped';
  readonly tool: string;
}

export interface SuccessReport {
  readonly path?: string | undefined;
  readonly status: 'success';
  readonly tool: string;
}
