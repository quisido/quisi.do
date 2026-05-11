/**
 * Infers a table-of-contents-style heading level from rendered design-system
 * structure. The first heading in an unlabelled context starts at level 1.
 * Headings for sibling sections stay at the same level, and headings for child
 * sections increment the nearest labelled parent section by 1.
 *
 * An explicit `aria-level` wins first. When an element is labelled by another
 * element, the label's level is used so labelled containers inherit the level
 * of their rendered heading. When calculating the original element, a previous
 * sibling's level is treated as the current level. When walking up through
 * parent elements, previous siblings are ignored because siblings do not define
 * child depth. The closest labelled parent level is passed through intermediate
 * wrapper elements and incremented once for the original element.
 *
 * This intentionally models this design system's table-of-contents hierarchy,
 * not the browser's semantic HTML or ARIA outline algorithm. A checked set
 * prevents cycles through `aria-labelledby`, parent, and sibling relationships.
 */
import safeParseInt from './safe-parse-int.js';

interface State {
  readonly checked: Set<Element>;
  readonly element: Element;
  readonly shouldCheckPreviousSiblings: boolean;
}

const getParent = ({
  checked,
  element,
}: Pick<State, 'checked' | 'element'>): HTMLElement | null => {
  const parent: HTMLElement | null = element.parentElement;
  if (parent === null) {
    return null;
  }

  if (checked.has(parent)) {
    return getParent({ checked, element: parent });
  }

  return parent;
};

const getPreviousSibling = ({
  checked,
  element,
}: Pick<State, 'checked' | 'element'>): Element | null => {
  const previousSibling: Element | null = element.previousElementSibling;
  if (previousSibling === null) {
    return null;
  }

  if (checked.has(previousSibling)) {
    return getPreviousSibling({ checked, element: previousSibling });
  }

  return previousSibling;
};

const getElementLevel = ({
  checked,
  element,
  shouldCheckPreviousSiblings,
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
      return getElementLevel({
        checked,
        element: label,
        shouldCheckPreviousSiblings,
      });
    }
  }

  if (shouldCheckPreviousSiblings) {
    const previousSibling: Element | null = getPreviousSibling({
      checked,
      element,
    });
    if (previousSibling !== null) {
      return getElementLevel({
        checked,
        element: previousSibling,
        shouldCheckPreviousSiblings: true,
      });
    }
  }

  const parent: HTMLElement | null = getParent({ checked, element });
  if (parent === null) {
    return;
  }

  const parentLevel: number | undefined = getElementLevel({
    checked,
    element: parent,
    shouldCheckPreviousSiblings: false,
  });

  if (parentLevel === undefined) {
    return;
  }

  if (shouldCheckPreviousSiblings) {
    return parentLevel + 1;
  }

  return parentLevel;
};

export default function mapElementToLevel(element: Element): number {
  return (
    getElementLevel({
      checked: new Set(),
      element,
      shouldCheckPreviousSiblings: true,
    }) ?? 1
  );
}
