export default function insertChild<Child>(
  children: Child[],
  child: Child,
  beforeChild?: Child | undefined,
): void {
  if (child === beforeChild) {
    return;
  }

  const previousIndex = children.indexOf(child);
  if (previousIndex !== -1) {
    children.splice(previousIndex, 1);
  }

  if (beforeChild === undefined) {
    children.push(child);
    return;
  }

  const nextIndex = children.indexOf(beforeChild);
  if (nextIndex === -1) {
    children.push(child);
  } else {
    children.splice(nextIndex, 0, child);
  }
}
