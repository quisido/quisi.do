/**
 *   Unlike other errors, `assert` errors must be caught and re-thrown,
 * therefore they do not require a `cause`.
 */
export default function assert(
  assertion: boolean,
  message: string,
): asserts assertion {
  if (assertion) {
    return;
  }

  throw new Error(message);
}
