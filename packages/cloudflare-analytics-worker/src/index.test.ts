/// <reference types="jest" />
import { unstable_dev } from 'wrangler';
import type { UnstableDevOptions, UnstableDevWorker } from 'wrangler';

const OPTIONS: UnstableDevOptions = {
  experimental: {
    disableExperimentalWarning: true,
  },
};

const worker: UnstableDevWorker = await unstable_dev('src/index.ts', OPTIONS);

describe('Cloudflare GraphQL Analytics worker', (): void => {
  it('should return Hello World', async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
  });
});

afterAll(async (): Promise<void> => {
  await worker.stop();
});
