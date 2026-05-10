import safeParseInt from './safe-parse-int.js';

interface State {
  readonly checked: Set<Element>;
  readonly element: Element;
  readonly isParent: boolean;
}

const getElementLevel = ({
  checked,
  element,
  isParent,
}: State): number | undefined => {
  checked.add(element);

  // If this element has an explicit level,
  const levelAttribute: string | null = element.getAttribute('aria-level');
  if (levelAttribute !== null) {
    try {
      return safeParseInt(levelAttribute);
    } catch (err: unknown) {
      throw new Error(
        `Invalid level for ${element.nodeName} element: ${levelAttribute}`,
        { cause: err },
      );
    }
  }

  // If this element has an external label,
  const labelId: string | null = element.getAttribute('aria-labelledby');
  if (labelId !== null) {
    const label: HTMLElement | null = window.document.getElementById(labelId);
    if (label !== null && !checked.has(label)) {
      return getElementLevel({ checked, element: label, isParent });
    }
  }

  // If this element has a previous sibling with level,
  const getPreviousSibling = (el: Element): Element | null => {
    const previousSibling: Element | null = el.previousElementSibling;
    if (previousSibling === null) {
      return null;
    }

    if (checked.has(previousSibling)) {
      return getPreviousSibling(previousSibling);
    }

    return previousSibling;
  };

  const previousSibling: Element | null = getPreviousSibling(element);
  if (previousSibling !== null) {
    return getElementLevel({
      checked,
      element: previousSibling,
      isParent: false,
    });
  }

  // If this element has a parent with a level,
  const getParent = (el: Element): HTMLElement | null => {
    const parent: HTMLElement | null = el.parentElement;
    if (parent === null) {
      return null;
    }

    if (checked.has(parent)) {
      return getParent(parent);
    }

    return parent;
  };

  const parent: HTMLElement | null = getParent(element);
  if (parent === null) {
    return;
  }

  const parentLevel: number | undefined = getElementLevel({
    checked,
    element: parent,
    isParent: true,
  });

  if (parentLevel === undefined) {
    return;
  }

  return parentLevel + (isParent ? 0 : 1);
};

export default function mapElementToLevel(element: Element): number {
  return (
    getElementLevel({
      checked: new Set(),
      element,
      isParent: false,
    }) ?? 1
  );
}
