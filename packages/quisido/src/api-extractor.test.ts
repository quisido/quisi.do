import { describe, expect, it } from 'vitest';
import config from '../api-extractor.json' with { type: 'json' };

describe('api-extractor.json', (): void => {
  it('should enable all API outputs', (): void => {
    expect(config.apiReport.enabled).toBe(true);
    expect(config.docModel.enabled).toBe(true);
    expect(config.dtsRollup.enabled).toBe(true);
    expect(config.tsdocMetadata.enabled).toBe(true);
  });

  it('should treat every diagnostic category as an error', (): void => {
    expect(config.messages.compilerMessageReporting.default.logLevel).toBe(
      'error',
    );
    expect(config.messages.extractorMessageReporting.default.logLevel).toBe(
      'error',
    );
    expect(config.messages.tsdocMessageReporting.default.logLevel).toBe(
      'error',
    );
  });
});
