export default interface VerifyResponseMessage {
  readonly code: number;
  readonly message: string;
  readonly type: null | string; // may not actually be a string
}
