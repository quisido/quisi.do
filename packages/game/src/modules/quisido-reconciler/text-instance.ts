export default interface TextInstance {
  readonly hide: () => void;
  readonly reset: () => void;
  readonly unhide: (text: string) => void;
  readonly update: (oldText: string, newText: string) => void;
}
