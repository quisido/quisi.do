import { useCallback, useState } from 'react';

// referential inequality triggers re-render
const createNewObject = (): Record<string, never> => ({});

export default function useForceUpdate(): () => void {
  const [, setValue] = useState<Record<string, never>>(createNewObject);

  return useCallback((): void => {
    setValue(createNewObject());
  }, []);
}
