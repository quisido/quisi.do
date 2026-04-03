export default function assert(
  assertion: boolean,
  message: string,
): asserts assertion {
  if (!assertion) {
    throw new Error(message);
  }
}
