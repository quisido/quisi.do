import { mapMapToRecord } from 'fmrs';
import type { PartialReadonlyRecord } from './partial-readonly-record.js';

const reduceChildrenEntriesToJson = (
  record: PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>>,
  [parentId, children]: readonly [string, Map<string, string>],
): PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>> => ({
  ...record,
  [parentId]: mapMapToRecord(children),
});

export default class Children {
  readonly #children = new Map<string, Map<string, string>>();

  public constructor(
    children:
      | PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>>
      | undefined,
  ) {
    this.set(children);
  }

  public getChildId(parentId: string, childKey: string): string | undefined {
    return this.getChildren(parentId).get(childKey);
  }

  private getChildren(parentId: string): Map<string, string> {
    const children: Map<string, string> | undefined =
      this.#children.get(parentId);
    if (typeof children !== 'undefined') {
      return children;
    }

    const newChildren = new Map<string, string>();
    this.#children.set(parentId, newChildren);
    return newChildren;
  }

  public set(
    children:
      | PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>>
      | undefined,
  ): void {
    this.#children.clear();

    if (typeof children === 'undefined') {
      return;
    }

    for (const [parentId, objectChildren] of Object.entries(children)) {
      if (typeof objectChildren === 'undefined') {
        continue;
      }

      this.setChildren(parentId, objectChildren);
    }
  }

  public setChild(parentId: string, childKey: string, childId: string): void {
    this.getChildren(parentId).set(childKey, childId);
  }

  public setChildren(
    parentId: string,
    children: PartialReadonlyRecord<string, string>,
  ): void {
    const childrenMap: Map<string, string> = this.getChildren(parentId);
    for (const [childKey, childId] of Object.entries(children)) {
      if (typeof childId === 'undefined') {
        continue;
      }

      childrenMap.set(childKey, childId);
    }
  }

  public toJSON(): PartialReadonlyRecord<
    string,
    PartialReadonlyRecord<string, string>
  > {
    return this.#children.entries().reduce(reduceChildrenEntriesToJson, {});
  }
}
