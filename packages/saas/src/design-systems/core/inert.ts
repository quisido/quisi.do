const forEach = <T>(
  start: T,
  getNext: (value: T) => T | null,
  act: (value: T) => void,
): void => {
  for (
    let value: T | null = getNext(start);
    value !== null;
    value = getNext(value)
  ) {
    act(value);
  }
};

const getNextHtmlElementSibling = (
  element: HTMLElement,
): HTMLElement | null => {
  let next: Element | null = element.nextElementSibling;
  while (next !== null) {
    if (next instanceof HTMLElement) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null;
};

const getPreviousHtmlElementSibling = (
  element: HTMLElement,
): HTMLElement | null => {
  let prev: Element | null = element.previousElementSibling;
  while (prev !== null) {
    if (prev instanceof HTMLElement) {
      return prev;
    }
    prev = prev.previousElementSibling;
  }
  return null;
};

const setInert = (element: HTMLElement): void => {
  element.setAttribute('inert', '');
  element.inert = true;
};

const unsetInert = (element: HTMLElement): void => {
  element.removeAttribute('inert');
  element.inert = false;
};

export const unsetInertSiblings = (element: HTMLElement): void => {
  forEach(element, getPreviousHtmlElementSibling, unsetInert);
  forEach(element, getNextHtmlElementSibling, unsetInert);
};

export const setInertSiblings = (element: HTMLElement): void => {
  forEach(element, getPreviousHtmlElementSibling, setInert);
  forEach(element, getNextHtmlElementSibling, setInert);
};
