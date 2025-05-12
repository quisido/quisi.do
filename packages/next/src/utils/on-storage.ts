type Callback = (value: string | null) => void;

const EMPTY = 0;
const EMPTY_SET: ReadonlySet<never> = new Set();
const HANDLERS = new Map<string, ReadonlySet<Callback>>();
const SINGLE = 1;

const handleStorage = ({ key, newValue }: StorageEvent): void => {
  if (key === null) {
    return;
  }

  const handlers: ReadonlySet<Callback> | undefined = HANDLERS.get(key);
  if (typeof handlers === 'undefined') {
    return;
  }

  for (const handler of handlers) {
    handler(newValue);
  }
};

export default function onStorage(
  key: string,
  handler: Callback,
): VoidFunction {
  const oldHandlers: ReadonlySet<Callback> = HANDLERS.get(key) ?? EMPTY_SET;
  HANDLERS.set(key, new Set<Callback>([...oldHandlers, handler]));

  if (HANDLERS.size === SINGLE) {
    window.addEventListener('storage', handleStorage);
  }

  return (): void => {
    const handlers = new Set<Callback>(HANDLERS.get(key));
    handlers.delete(handler);
    if (handlers.size === EMPTY) {
      HANDLERS.delete(key);
    } else {
      HANDLERS.set(key, handlers);
    }
  };
}
