import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { FormProps } from '../core/form-props.js';

export default function testForm(Form: ComponentType<FormProps>): void {
  describe('Form', (): void => {
    it('should be a form', (): void => {
      const { getByName } = render(<Form label="Test form">Test content</Form>);

      getByName('form', 'Test form');
    });
  });
}
