import safeParseInt from './safe-parse-int.js';

interface State {
  readonly checked: Set<Element>;
  readonly element: Element;
  readonly isParent: boolean;
}

const getElementLevel = ({ checked, element, isParent }: State): number => {
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

  // If this element's previous sibling has a level,
  // Note: This is recurse through all previous siblings.
  const sibling: Element | null = element.previousElementSibling;
  if (sibling !== null && !checked.has(sibling)) {
    return getElementLevel({ checked, element: sibling, isParent });
  }

  // If this element's parent has a level, increment this element's level.
  const parent: HTMLElement | null = element.parentElement;
  if (parent === null || checked.has(parent)) {
    return 1;
  }

  // If we're already traversing parents, do not increment the level again.
  if (isParent) {
    return getElementLevel({ checked, element: parent, isParent: true });
  }

  // This element's level is one higher than its parent's level.
  return getElementLevel({ checked, element: parent, isParent: true }) + 1;
};

export default function mapElementToLevel(element: Element): number {
  return getElementLevel({
    checked: new Set(),
    element,
    isParent: false,
  });
}
