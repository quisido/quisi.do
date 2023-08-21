import { useContext, type Context } from 'react';

export default function mapContextToHook<T>(
  Context: Context<T | null>,
): () => T {
  return function useValue(): T {
    const value: T | null = useContext(Context);

    if (value === null) {
      throw new Error('Expected a value to be provided.');
    }

    return value;
  };
}
