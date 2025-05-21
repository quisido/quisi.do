import { useCallback, useState } from 'react';

const createNewObject = (): Record<string, never> => ({});

export default function useForceUpdate(): () => void {
  const [, setValue] = useState<Record<string, never>>(createNewObject);

  return useCallback((): void => {
    setValue(createNewObject());
  }, []);
}
