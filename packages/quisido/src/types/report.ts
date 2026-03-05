export default interface Report {
  readonly context?: string | undefined;
  readonly message?: string | undefined;
  readonly path?: string | undefined;
  readonly status: 'failure' | 'skipped' | 'success';
  readonly tool: string;
}
