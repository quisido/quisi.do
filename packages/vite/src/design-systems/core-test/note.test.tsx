import { describe, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Note } = await importTestedDesignSystem();

describe('Note', (): void => {
  it('should render a note', (): void => {
    const { getByRole } = render(<Note>Test content</Note>);
    getByRole('note');
  });
});
