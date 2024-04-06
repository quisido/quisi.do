export default function assert(condition: boolean): asserts condition {
  if (condition) {
    return;
  }
  throw new Error('Assertion failed.');
}
