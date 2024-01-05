import type LocalStorageItem from '../constants/local-storage-item';
import getLocalStorageItem from '../utils/get-local-storage-item';
import useEffectEvent from './use-effect-event';

export default function useLocalStorage(
  item: LocalStorageItem,
): [null | string, (value: null | string) => void] {
  return [
    getLocalStorageItem(item),
    useEffectEvent((value: null | string): void => {
      if (value === null) {
        window.localStorage.removeItem(item);
        return;
      }

      window.localStorage.setItem(item, value);
    }),
  ];
}
