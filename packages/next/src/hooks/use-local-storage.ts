import { useLayoutEffect, useState } from 'react';
import type LocalStorageItem from '../constants/local-storage-item.js';
import getLocalStorageItem from '../utils/get-local-storage-item.js';
import useEffectEvent from './use-effect-event.js';

export default function useLocalStorage(
  item: LocalStorageItem,
): [null | string, (value: null | string) => void] {
  const [value, setValue] = useState<string | null>(null);

  useLayoutEffect((): void => {
    setValue(getLocalStorageItem(item));
  }, [item]);

  return [
    getLocalStorageItem(item) ?? value,
    useEffectEvent((newValue: null | string): void => {
      if (newValue === null) {
        window.localStorage.removeItem(item);
        setValue(null);
        return;
      }

      window.localStorage.setItem(item, newValue);
      setValue(newValue);
    }),
  ];
}
