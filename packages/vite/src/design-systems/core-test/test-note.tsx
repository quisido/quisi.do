import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { NoteProps } from '../core/note-props.js';
import render from './render.js';

export default function testNote(Note: ComponentType<NoteProps>): void {
  describe('Note', (): void => {
    it('should render a note', (): void => {
      const { getByRole } = render(<Note>Test content</Note>);
      getByRole('note');
    });
  });
}
