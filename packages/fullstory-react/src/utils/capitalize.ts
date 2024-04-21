const FIRST = 0;
const SECOND = 1;

export default function capitalize<T extends string>(str: T): Capitalize<T> {
  // Type 'string' is not assignable to type 'Capitalize<T>'.
  return (str.charAt(FIRST).toUpperCase() + str.slice(SECOND)) as Capitalize<T>;
}
