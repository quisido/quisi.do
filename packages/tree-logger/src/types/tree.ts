export default interface Tree {
  readonly children: Tree[];
  readonly errors: Error[];
  readonly value: string;
}
