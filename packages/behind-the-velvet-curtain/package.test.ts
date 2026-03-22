import { describe, expect, it } from 'vitest';
import packageJSON from './package.json';

describe('package.json', (): void => {
  it('matches the workspace conventions', (): void => {
    expect(packageJSON.name).toBe('@quisido/behind-the-velvet-curtain');
    expect(packageJSON.private).toBe(true);
    expect(packageJSON.type).toBe('module');
    expect(packageJSON.scripts.build).toBe('tsc --skipLibCheck && vite build');
    expect(packageJSON.scripts.test).toBe(
      'quisido test && npm run vitest:run && npm run vitest:browser',
    );
  });
});
