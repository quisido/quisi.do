import type { ErrorCode } from "@quisido/authn-shared";

export default function createDataError(
  code: ErrorCode,
  data: unknown,
): Error {
  return new Error(`Error code #${code.toString()}`, {
    cause: JSON.stringify(data),
  });
}
