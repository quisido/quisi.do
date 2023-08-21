import { existsSync } from 'fs';
import { join } from 'path';
import RESUME_HREF from './resume-href';

const RESUME_PATH = join('public', RESUME_HREF);

describe('RESUME_HREF', (): void => {
  it('should exist in /public', (): void => {
    const exists: boolean = existsSync(RESUME_PATH);
    expect(exists).toBe(true);
  });
});
