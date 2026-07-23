import removeDescribedBy from './remove-described-by.js';

const toString = (set: ReadonlySet<string>): string => [...set].join(' ');

export default function appendDescribedBy(
  element: HTMLElement,
  id: string,
): VoidFunction {
  const attr: string | null = element.getAttribute('aria-describedby');
  if (attr === null) {
    element.setAttribute('aria-describedby', id);
  } else {
    const prevIdsArr: readonly string[] = attr.split(/\s+/u);
    const prevIdsSet: ReadonlySet<string> = new Set([...prevIdsArr, id]);
    const nextDescribedBy: string = toString(prevIdsSet);
    element.setAttribute('aria-describedby', nextDescribedBy);
  }

  return (): void => {
    removeDescribedBy(element, id);
  };
}
