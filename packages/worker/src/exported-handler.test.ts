import { describe, expect, it } from 'vitest';
import { ExportedHandler } from './index.js';

describe('ExportedHandler', (): void => {
  it('should construct with no parameters', (): void => {
    const exportedHandler = new ExportedHandler();
    expect(exportedHandler.fetch).toBeTypeOf('undefined');
    expect(exportedHandler.email).toBeTypeOf('undefined');
    expect(exportedHandler.queue).toBeTypeOf('undefined');
    expect(exportedHandler.scheduled).toBeTypeOf('undefined');
    expect(exportedHandler.tail).toBeTypeOf('undefined');
    expect(exportedHandler.test).toBeTypeOf('undefined');
    expect(exportedHandler.trace).toBeTypeOf('undefined');
  });
});
