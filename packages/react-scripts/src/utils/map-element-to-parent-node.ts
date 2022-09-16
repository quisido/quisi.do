export default function mapElementToParentNode(
  element: Element | ProcessingInstruction,
): ParentNode {
  const parentNode: ParentNode | null = element.parentNode;

  if (parentNode === null) {
    throw new Error('Expected element to have a parent node.');
  }

  return parentNode;
}
