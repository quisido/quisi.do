// Server-side rendering does not support local storage.
export default function getLocalStorageItem(item: string): null | string {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(item);
}
