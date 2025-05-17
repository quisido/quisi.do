export default function createNotImplementedThrower(methodName: string): never {
  throw new Error(`\`${methodName}\` is not implemented.`);
}
