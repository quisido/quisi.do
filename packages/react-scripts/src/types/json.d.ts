declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _: Record<string, any>;
  export = _;
}
