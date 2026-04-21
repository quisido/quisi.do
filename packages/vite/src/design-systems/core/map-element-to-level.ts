const BASE = 10;

export default function mapElementToLevel(element: HTMLElement | null): number {
  if (element === null) {
    return 1;
  }

  const labelId: string | null = element.getAttribute('aria-labelledby');
  if (labelId === null) {
    return mapElementToLevel(element.parentElement);
  }

  const label: HTMLElement | null = window.document.getElementById(labelId);
  if (label === null) {
    throw new Error(`Expected a label with ID #${labelId}`, { cause: element });
  }

  const levelStr: string | null = label.getAttribute('aria-level');
  if (levelStr === null) {
    return mapElementToLevel(element.parentElement);
  }

  const levelInt: number = parseInt(levelStr, BASE);
  if (isNaN(levelInt)) {
    return mapElementToLevel(element.parentElement);
  }

  return levelInt;
}
