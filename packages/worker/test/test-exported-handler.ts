import { TEST_CONSOLE } from 'cloudflare-test-utils';
import { vi } from 'vitest';
import { ExportedHandler, type ExportedHandlerOptions } from '../src/index.js';

const TEST_FETCH = vi.fn();

export class TestExportedHandler<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> extends ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata> {
  public constructor({
    fetch = TEST_FETCH,
    ...options
  }: Omit<
    ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata>,
    'console' | 'fetch'
  > &
    Partial<
      Pick<
        ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata>,
        'fetch'
      >
    >) {
    super({
      console: TEST_CONSOLE,
      fetch,
      ...options,
    });
  }
}
