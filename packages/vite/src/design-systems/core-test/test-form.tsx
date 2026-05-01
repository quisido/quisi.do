import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { FormProps } from '../core/form-props.js';
import type { RegionProps } from '../core/region-props.js';
import noop from '../../utils/noop.js';

interface Options {
  readonly Region: ComponentType<RegionProps>;
}

export default function testForm(
  Form: ComponentType<FormProps>,
  { Region }: Options,
): void {
  describe('Form', (): void => {
    describe('heading', (): void => {
      it('should be supported', (): void => {
        const { getByName } = render(
          <Form heading="Test heading" onSubmit={noop}>
            Test content
          </Form>,
        );

        getByName('form', 'Test heading');
      });

      it('should increment', (): void => {
        const { getHeadingByLevel } = render(
          <Form heading="Test form heading" onSubmit={noop}>
            <Region heading="Test region heading">Test content</Region>
          </Form>,
        );

        getHeadingByLevel('Test form heading', 2);
        getHeadingByLevel('Test region heading', 3);
      });
    });

    it('should support external labels', (): void => {
      const { getByName } = render(
        <>
          <span id="test-form-label-id">Test labelled by</span>
          <Form labelledBy="test-form-label-id" onSubmit={noop}>
            Test content
          </Form>
          ,
        </>,
      );
      getByName('form', 'Test labelled by');
    });
  });
}
