import { identity } from 'fmrs';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import SetMap from './set-map.js';
import useLocalStorageWindow from './use-local-storage-window.js';

type StateSetter = (value: unknown) => void;

const STATE_SETTERS = new SetMap<StateSetter>();

const isState = <T>(value: SetStateAction<T>): value is T =>
  typeof value !== 'function';

export default function useLocalStorage(
  key: string,
  parse?: undefined,
  stringify?: undefined,
): readonly [string | null, Dispatch<SetStateAction<string | null>>];
export default function useLocalStorage<T>(
  key: string,
  parse: (value: string) => T,
  stringify: (value: T) => string,
): readonly [T | null, Dispatch<SetStateAction<T | null>>];
export default function useLocalStorage<T = string>(
  key: string,
  // @ts-expect-error: If `parse` is `undefined`, then `T` is `string`.
  parse: ((value: string) => T) | undefined = identity,
  // @ts-expect-error: If `stringify` is `undefined`, then `T` is `string`.
  stringify: ((value: T) => string) | undefined = identity,
): readonly [T | null, Dispatch<SetStateAction<T | null>>] {
  // Contexts
  const wndw: Window | null = useLocalStorageWindow();

  // States
  const [stateValue, setStateValue] = useState<T | null>(null);

  // Effects
  /**
   *   Set the component state to the local storage value. We do this as a
   * side-effect so that client-side renders (with local storage) hydrate
   * correctly against a server-side render (without local storage).
   */
  useLayoutEffect((): void => {
    if (wndw === null) {
      return;
    }

    /**
     *   If the provided Window changes (which realistically should never
     * happen), and the new value does not exist, erase the component state too.
     */
    const storageValue: string | null = wndw.localStorage.getItem(key);
    if (storageValue === null) {
      setStateValue(null);
      return;
    }

    const newStateValue: T = parse(storageValue);
    setStateValue(newStateValue);
  }, [key, parse, wndw]);

  /**
   *   Add the state setter to the callback Map so that whichever component sets
   * the storage item can also update this component state's.
   */
  useEffect((): VoidFunction => {
    STATE_SETTERS.add(key, setStateValue as StateSetter);

    return (): void => {
      STATE_SETTERS.delete(key, setStateValue as StateSetter);
    };
  }, [key]);

  /**
   *   Listen for a `storage` event, which only fires when a separate tab sets
   * a storage item.
   */
  useEffect((): VoidFunction | undefined => {
    if (wndw === null) {
      return;
    }

    const handleStorage = ({
      key: eventKey,
      newValue: newStorageValue,
    }: StorageEvent): void => {
      if (eventKey !== key) {
        return;
      }

      if (newStorageValue === null) {
        setStateValue(null);
        return;
      }

      const newStateValue: T = parse(newStorageValue);
      setStateValue(newStateValue);
    };

    wndw.addEventListener('storage', handleStorage);
    return (): void => {
      wndw.removeEventListener('storage', handleStorage);
    };
  }, [key, parse, wndw]);

  return useMemo(
    (): readonly [T | null, Dispatch<SetStateAction<T | null>>] => [
      stateValue,
      (action: SetStateAction<T | null>): void => {
        // Set the new state value both in storage and in all component states.
        const setValues = (newStateValue: T | null): void => {
          // Set local storage.
          if (wndw !== null) {
            if (newStateValue === null) {
              wndw.localStorage.removeItem(key);
            } else {
              const newStorageValue: string = stringify(newStateValue);
              wndw.localStorage.setItem(key, newStorageValue);
            }
          }

          // Set component states.
          for (const setState of STATE_SETTERS.get(key)) {
            setState(newStateValue);
          }
        };

        if (isState(action)) {
          setValues(action);
          return;
        }

        const newValue: T | null = action(stateValue);
        setValues(newValue);
      },
    ],
    [key, stateValue, stringify, wndw],
  );
}
