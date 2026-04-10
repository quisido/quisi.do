import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { NoteProps } from '../core/note-props.js';

export default function testNote(Note: ComponentType<NoteProps>): void {
  describe('Note', (): void => {
    it('should render a note', (): void => {
      const { getByRole } = render(<Note>Test content</Note>);
      getByRole('note', { name: 'Test content' });
    });
  });
}
