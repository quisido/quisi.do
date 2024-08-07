import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import getHead from './get-head.js';

const FIRST = 0;
const TEST_HEAD: HTMLHeadElement = window.document.createElement('head');

const appendHead = (): void => {
  window.document.body.appendChild(TEST_HEAD);
};

const removeHead = (): void => {
  const head: HTMLHeadElement | null = document
    .getElementsByTagName('head')
    .item(FIRST);

  if (head === null) {
    return;
  }

  head.remove();
};

describe('getHead', (): void => {
  describe('with head', (): void => {
    beforeEach(appendHead);
    afterEach(removeHead);

    it('should return the head element', (): void => {
      expect(getHead()).toStrictEqual(TEST_HEAD);
    });
  });

  describe('without head', (): void => {
    beforeEach(removeHead);

    it('should throw an error', (): void => {
      expect(getHead).toThrow('Expected to find a head element.');
    });
  });
});
