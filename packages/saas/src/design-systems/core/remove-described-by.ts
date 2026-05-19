export default function removeDescribedBy(
  element: HTMLElement,
  id: string,
): void {
  const attr: string | null = element.getAttribute('aria-describedby');
  if (attr === null) {
    return;
  }

  const arr: readonly string[] = attr.split(/\s+/u);
  const set = new Set<string>(arr);
  set.delete(id);

  if (set.size === 0) {
    element.removeAttribute('aria-describedby');
    return;
  }

  const nextAttr: string = [...set].join(' ');
  element.setAttribute('aria-describedby', nextAttr);
}
