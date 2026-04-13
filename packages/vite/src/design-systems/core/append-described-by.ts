import removeDescribedBy from './remove-described-by.js';

const EMPTY_ARRAY: readonly never[] = [];

const toString = (set: ReadonlySet<string>): string => [...set].join(' ');

export default function appendDescribedBy(
  element: HTMLElement,
  id: string,
): VoidFunction {
  const attr: string | null = element.getAttribute('aria-describedby');
  const arr: readonly string[] = attr?.split(/\s+/u) ?? EMPTY_ARRAY;
  const set: ReadonlySet<string> = new Set([...arr, id]);
  const nextStr: string = toString(set);
  element.setAttribute('aria-describedby', nextStr);

  return (): void => {
    removeDescribedBy(element, id);
  };
}
