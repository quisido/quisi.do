export default function createNotImplementedThrower(
  methodName: string,
): () => never {
  return (): never => {
    throw new Error(`\`${methodName}\` is not implemented.`);
  };
}
