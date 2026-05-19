export default function isGenericRole(element: Element): boolean {
  return element.getAttribute('role') === 'generic';
}
