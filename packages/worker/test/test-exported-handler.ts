import { vi } from 'vitest';
import { ExportedHandler, type ExportedHandlerOptions } from '../src/index.js';
import { TEST_CONSOLE } from './test-console.js';

const TEST_FETCH = vi.fn();

export class TestExportedHandler<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> extends ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata> {
  public constructor(
    options: Omit<
      ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata>,
      'console' | 'fetch'
    >,
  ) {
    super({
      console: TEST_CONSOLE,
      fetch: TEST_FETCH,
      ...options,
    });
  }
}
