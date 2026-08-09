import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildDatadogSeriesPayload,
  emitDatadogSeriesPayload,
  parseCodexTokenUsage,
  run,
} from './emit-token-usage.js';

describe('parseCodexTokenUsage', (): void => {
  it('should parse token usage from nested Codex JSONL events', (): void => {
    const tokenUsage = parseCodexTokenUsage(
      [
        JSON.stringify({
          event: {
            usage: {
              cached_input_tokens: 20,
              input_tokens: 100,
              output_tokens: 30,
              reasoning_output_tokens: 10,
              total_tokens: 130,
            },
          },
        }),
      ].join('\n'),
    );

    expect(tokenUsage).toStrictEqual({
      cachedInputTokens: 20,
      inputTokens: 100,
      outputTokens: 30,
      reasoningOutputTokens: 10,
      totalTokens: 130,
    });
  });

  it('should parse OpenAI token detail fields', (): void => {
    const tokenUsage = parseCodexTokenUsage(
      JSON.stringify({
        response: {
          usage: {
            input_tokens: 100,
            input_tokens_details: {
              cached_tokens: 40,
            },
            output_tokens: 30,
            output_tokens_details: {
              reasoning_tokens: 12,
            },
            total_tokens: 130,
          },
        },
      }),
    );

    expect(tokenUsage).toStrictEqual({
      cachedInputTokens: 40,
      inputTokens: 100,
      outputTokens: 30,
      reasoningOutputTokens: 12,
      totalTokens: 130,
    });
  });

  it('should use the latest usage values and ignore non-JSON lines', (): void => {
    const tokenUsage = parseCodexTokenUsage(
      [
        '',
        'Codex warning',
        JSON.stringify({ usage: { input_tokens: 10, total_tokens: 20 } }),
        JSON.stringify({ usage: { output_tokens: 15, total_tokens: 25 } }),
      ].join('\n'),
    );

    expect(tokenUsage).toStrictEqual({
      cachedInputTokens: undefined,
      inputTokens: 10,
      outputTokens: 15,
      reasoningOutputTokens: undefined,
      totalTokens: 25,
    });
  });

  it('should parse array events and alternate token field names', (): void => {
    const tokenUsage = parseCodexTokenUsage(
      JSON.stringify([
        null,
        {
          cachedPromptTokens: 2,
          completionTokens: 3,
          inputTokens: 1,
          reasoningTokens: 4,
          totalTokens: 5,
        },
      ]),
    );

    expect(tokenUsage).toStrictEqual({
      cachedInputTokens: 2,
      inputTokens: 1,
      outputTokens: 3,
      reasoningOutputTokens: 4,
      totalTokens: 5,
    });
  });

  it('should return null when no token usage exists', (): void => {
    expect(
      parseCodexTokenUsage(JSON.stringify({ type: 'message' })),
    ).toBeNull();
  });
});

describe('buildDatadogSeriesPayload', (): void => {
  it('should build Datadog series with GitHub run tags', (): void => {
    const payload = buildDatadogSeriesPayload(
      {
        inputTokens: 100,
        totalTokens: 130,
      },
      {
        GITHUB_JOB: 'codex',
        GITHUB_REF: 'refs/heads/main',
        GITHUB_REPOSITORY: 'quisido/quisi.do',
        GITHUB_RUN_ATTEMPT: '1',
        GITHUB_RUN_ID: '123',
        GITHUB_SHA: 'abc123',
        GITHUB_WORKFLOW: 'Issue comment',
      },
      1_800_000_000,
    );

    expect(payload).toStrictEqual({
      series: [
        {
          metric: 'codex.tokens.input',
          points: [[1_800_000_000, 100]],
          tags: [
            'repository:quisido/quisi.do',
            'workflow:Issue comment',
            'job:codex',
            'run_id:123',
            'run_attempt:1',
            'ref:refs/heads/main',
            'sha:abc123',
          ],
          type: 'gauge',
        },
        {
          metric: 'codex.tokens.total',
          points: [[1_800_000_000, 130]],
          tags: [
            'repository:quisido/quisi.do',
            'workflow:Issue comment',
            'job:codex',
            'run_id:123',
            'run_attempt:1',
            'ref:refs/heads/main',
            'sha:abc123',
          ],
          type: 'gauge',
        },
      ],
    });
  });

  it('should omit empty GitHub run tags', (): void => {
    const payload = buildDatadogSeriesPayload(
      {
        inputTokens: 100,
      },
      {
        GITHUB_REPOSITORY: '',
      },
      1_800_000_000,
    );

    expect(payload.series[0]?.tags).toStrictEqual([]);
  });
});

describe('emitDatadogSeriesPayload', (): void => {
  it('should post the payload to Datadog', async (): Promise<void> => {
    const requests: Request[] = [];
    const fetchFunction: typeof fetch = (input, init): Promise<Response> => {
      requests.push(new Request(input, init));
      return Promise.resolve(new Response('{}', { status: 202 }));
    };

    await emitDatadogSeriesPayload(
      'api-key',
      'datadoghq.com',
      { series: [] },
      fetchFunction,
    );

    expect(requests).toHaveLength(1);
    expect(requests[0]?.url).toBe('https://api.datadoghq.com/api/v1/series');
    expect(requests[0]?.headers.get('DD-API-KEY')).toBe('api-key');
    expect(requests[0]?.headers.get('Content-Type')).toBe('application/json');
    expect(await requests[0]?.json()).toStrictEqual({ series: [] });
  });

  it('should throw when Datadog rejects the payload', async (): Promise<void> => {
    const fetchFunction: typeof fetch = (): Promise<Response> =>
      Promise.resolve(
        new Response('bad request', {
          status: 400,
          statusText: 'Bad Request',
        }),
      );

    await expect(
      emitDatadogSeriesPayload(
        'api-key',
        'datadoghq.com',
        { series: [] },
        fetchFunction,
      ),
    ).rejects.toThrow('Failed to emit Codex token usage to Datadog.');
  });
});

describe('run', (): void => {
  it('should use default options', async (): Promise<void> => {
    const previousDatadogApiKey: string | undefined =
      process.env.DATADOG_API_KEY;
    delete process.env.DATADOG_API_KEY;

    try {
      await run();
    } finally {
      if (previousDatadogApiKey === undefined) {
        delete process.env.DATADOG_API_KEY;
      } else {
        process.env.DATADOG_API_KEY = previousDatadogApiKey;
      }
    }
  });

  it('should emit token usage from the configured file', async (): Promise<void> => {
    const directory: string = await mkdtemp(
      join(tmpdir(), 'codex-token-usage-'),
    );
    const tokenUsagePath: string = join(directory, 'codex-token-usage.jsonl');
    const requests: Request[] = [];
    const writes: string[] = [];
    const fetchFunction: typeof fetch = (input, init): Promise<Response> => {
      requests.push(new Request(input, init));
      return Promise.resolve(new Response('{}', { status: 202 }));
    };
    await writeFile(
      tokenUsagePath,
      JSON.stringify({
        usage: {
          input_tokens: 100,
          total_tokens: 130,
        },
      }),
    );

    await run({
      environment: {
        CODEX_TOKEN_USAGE_PATH: tokenUsagePath,
        DATADOG_API_KEY: 'api-key',
        DATADOG_SITE: 'https://api.datadoghq.eu/',
      },
      fetchFunction,
      now: (): number => 1_800_000_000_000,
      stdout: {
        write: (chunk: string): boolean => {
          writes.push(chunk);
          return true;
        },
      } as NodeJS.WriteStream,
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.url).toBe('https://api.datadoghq.eu/api/v1/series');
    expect(await requests[0]?.json()).toStrictEqual({
      series: [
        {
          metric: 'codex.tokens.input',
          points: [[1_800_000_000, 100]],
          tags: [],
          type: 'gauge',
        },
        {
          metric: 'codex.tokens.total',
          points: [[1_800_000_000, 130]],
          tags: [],
          type: 'gauge',
        },
      ],
    });
    expect(writes).toStrictEqual([
      'Emitted 2 Codex token usage metric(s) to Datadog.\n',
    ]);
  });

  it('should emit to the default Datadog site', async (): Promise<void> => {
    const directory: string = await mkdtemp(
      join(tmpdir(), 'codex-token-usage-'),
    );
    const tokenUsagePath: string = join(directory, 'codex-token-usage.jsonl');
    const requests: Request[] = [];
    const fetchFunction: typeof fetch = (input, init): Promise<Response> => {
      requests.push(new Request(input, init));
      return Promise.resolve(new Response('{}', { status: 202 }));
    };
    await writeFile(
      tokenUsagePath,
      JSON.stringify({
        usage: {
          input_tokens: 100,
        },
      }),
    );

    await run({
      environment: {
        CODEX_TOKEN_USAGE_PATH: tokenUsagePath,
        DATADOG_API_KEY: 'api-key',
      },
      fetchFunction,
    });

    expect(requests[0]?.url).toBe('https://api.datadoghq.com/api/v1/series');
  });

  it('should throw when the token usage path is missing', async (): Promise<void> => {
    await expect(
      run({
        environment: {
          DATADOG_API_KEY: 'api-key',
        },
      }),
    ).rejects.toThrow('Missing CODEX_TOKEN_USAGE_PATH.');
  });

  it('should skip when no token usage is found', async (): Promise<void> => {
    const directory: string = await mkdtemp(
      join(tmpdir(), 'codex-token-usage-'),
    );
    const tokenUsagePath: string = join(directory, 'codex-token-usage.jsonl');
    const writes: string[] = [];
    await writeFile(tokenUsagePath, JSON.stringify({ type: 'message' }));

    await run({
      environment: {
        CODEX_TOKEN_USAGE_PATH: tokenUsagePath,
        DATADOG_API_KEY: 'api-key',
      },
      fetchFunction: (): Promise<Response> =>
        Promise.reject(new Error('Unexpected fetch.')),
      stdout: {
        write: (chunk: string): boolean => {
          writes.push(chunk);
          return true;
        },
      } as NodeJS.WriteStream,
    });

    expect(writes).toStrictEqual([
      'Skipping Codex token usage metrics: no token usage found.\n',
    ]);
  });

  it('should skip when the Datadog API key is unset', async (): Promise<void> => {
    const writes: string[] = [];

    await run({
      environment: {},
      fetchFunction: (): Promise<Response> =>
        Promise.reject(new Error('Unexpected fetch.')),
      stdout: {
        write: (chunk: string): boolean => {
          writes.push(chunk);
          return true;
        },
      } as NodeJS.WriteStream,
    });

    expect(writes).toStrictEqual([
      'Skipping Codex token usage metrics: DATADOG_API_KEY is unset.\n',
    ]);
  });
});
