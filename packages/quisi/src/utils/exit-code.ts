/* eslint-disable no-magic-numbers */

export enum ExitCode {
  AccessViolation = 3221226505, // 0xC0000005
  HeapCorruption = 3221226356,
  StackBufferOverrun = 3221225477, // 0xC0000409, a.k.a. Security Check Failure
}
