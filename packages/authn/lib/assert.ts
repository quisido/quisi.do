export default function assert (
  condition: boolean,
  message?: string | undefined,
): asserts condition {

  if (!condition) {

    throw new Error(message ?? "Assertion failed");

  }

}
