import MISSING_HEAD_ERROR from '../constants/missing-head-element';

const FIRST = 0;

export default function getHead(): HTMLHeadElement {
  const head: HTMLHeadElement | null = document
    .getElementsByTagName('head')
    .item(FIRST);

  if (head === null) {
    throw MISSING_HEAD_ERROR;
  }

  return head;
}
