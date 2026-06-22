import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DEFAULT_DATADOG_SITE = 'datadoghq.com';
const MILLISECONDS_PER_SECOND = 1000;
const TOKEN_USAGE_METRICS: readonly TokenUsageMetric[] = [
  {
    key: 'inputTokens',
    metric: 'codex.tokens.input',
  },
  {
    key: 'cachedInputTokens',
    metric: 'codex.tokens.input.cached',
  },
  {
    key: 'outputTokens',
    metric: 'codex.tokens.output',
  },
  {
    key: 'reasoningOutputTokens',
    metric: 'codex.tokens.output.reasoning',
  },
  {
    key: 'totalTokens',
    metric: 'codex.tokens.total',
  },
];

interface DatadogSeries {
  readonly metric: string;
  readonly points: readonly (readonly [number, number])[];
  readonly tags: readonly string[];
  readonly type: 'gauge';
}

interface DatadogSeriesPayload {
  readonly series: readonly DatadogSeries[];
}

interface Options {
  readonly environment?: NodeJS.ProcessEnv | undefined;
  readonly fetchFunction?: typeof fetch | undefined;
  readonly now?: (() => number) | undefined;
  readonly stdout?: NodeJS.WriteStream | undefined;
}

interface TokenUsage {
  readonly cachedInputTokens?: number | undefined;
  readonly inputTokens?: number | undefined;
  readonly outputTokens?: number | undefined;
  readonly reasoningOutputTokens?: number | undefined;
  readonly totalTokens?: number | undefined;
}

interface TokenUsageMetric {
  readonly key: keyof TokenUsage;
  readonly metric: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mapValueToNumber = (value: unknown): number | undefined => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return undefined;
  }
  return value;
};

const findNumber = (
  record: Readonly<Record<string, unknown>>,
  keys: readonly string[],
): number | undefined => {
  for (const key of keys) {
    const value: number | undefined = mapValueToNumber(record[key]);
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
};

const mapRecordToTokenUsage = (
  record: Readonly<Record<string, unknown>>,
): TokenUsage => ({
  cachedInputTokens: findNumber(record, [
    'cached_input_tokens',
    'cachedInputTokens',
    'cached_prompt_tokens',
    'cachedPromptTokens',
    'cached_tokens',
    'cachedTokens',
  ]),
  inputTokens: findNumber(record, [
    'input_tokens',
    'inputTokens',
    'prompt_tokens',
    'promptTokens',
  ]),
  outputTokens: findNumber(record, [
    'completion_tokens',
    'completionTokens',
    'output_tokens',
    'outputTokens',
  ]),
  reasoningOutputTokens: findNumber(record, [
    'reasoning_output_tokens',
    'reasoningOutputTokens',
    'reasoning_tokens',
    'reasoningTokens',
  ]),
  totalTokens: findNumber(record, ['total_tokens', 'totalTokens']),
});

const mergeTokenUsage = (
  previousUsage: TokenUsage,
  nextUsage: TokenUsage,
): TokenUsage => ({
  cachedInputTokens:
    nextUsage.cachedInputTokens ?? previousUsage.cachedInputTokens,
  inputTokens: nextUsage.inputTokens ?? previousUsage.inputTokens,
  outputTokens: nextUsage.outputTokens ?? previousUsage.outputTokens,
  reasoningOutputTokens:
    nextUsage.reasoningOutputTokens ?? previousUsage.reasoningOutputTokens,
  totalTokens: nextUsage.totalTokens ?? previousUsage.totalTokens,
});

const reduceValueToTokenUsage = (
  tokenUsage: TokenUsage,
  value: unknown,
): TokenUsage => {
  if (Array.isArray(value)) {
    return value.reduce<TokenUsage>(reduceValueToTokenUsage, tokenUsage);
  }
  if (!isRecord(value)) {
    return tokenUsage;
  }
  return Object.values(value).reduce<TokenUsage>(
    reduceValueToTokenUsage,
    mergeTokenUsage(tokenUsage, mapRecordToTokenUsage(value)),
  );
};

const hasTokenUsage = (tokenUsage: TokenUsage): boolean =>
  TOKEN_USAGE_METRICS.some(({ key }): boolean => tokenUsage[key] !== undefined);

export const parseCodexTokenUsage = (contents: string): TokenUsage | null => {
  const tokenUsage: TokenUsage = contents
    .split(/\r?\n/u)
    .reduce<TokenUsage>(
      (previousUsage: TokenUsage, line: string): TokenUsage => {
        if (line.trim() === '') {
          return previousUsage;
        }
        try {
          return reduceValueToTokenUsage(previousUsage, JSON.parse(line));
        } catch {
          return previousUsage;
        }
      },
      {},
    );

  if (!hasTokenUsage(tokenUsage)) {
    return null;
  }
  return tokenUsage;
};

const mapEnvironmentEntryToTag = (
  key: string,
  value: string | undefined,
): string | undefined => {
  if (value === undefined || value === '') {
    return undefined;
  }
  return `${key}:${value}`;
};

const mapEnvironmentToTags = (
  environment: NodeJS.ProcessEnv,
): readonly string[] =>
  [
    mapEnvironmentEntryToTag('repository', environment['GITHUB_REPOSITORY']),
    mapEnvironmentEntryToTag('workflow', environment['GITHUB_WORKFLOW']),
    mapEnvironmentEntryToTag('job', environment['GITHUB_JOB']),
    mapEnvironmentEntryToTag('run_id', environment['GITHUB_RUN_ID']),
    mapEnvironmentEntryToTag('run_attempt', environment['GITHUB_RUN_ATTEMPT']),
    mapEnvironmentEntryToTag('ref', environment['GITHUB_REF']),
    mapEnvironmentEntryToTag('sha', environment['GITHUB_SHA']),
  ].filter((tag: string | undefined): tag is string => tag !== undefined);

export const buildDatadogSeriesPayload = (
  tokenUsage: TokenUsage,
  environment: NodeJS.ProcessEnv,
  timestamp: number,
): DatadogSeriesPayload => {
  const tags: readonly string[] = mapEnvironmentToTags(environment);
  return {
    series: TOKEN_USAGE_METRICS.flatMap(
      ({ key, metric }: TokenUsageMetric): readonly DatadogSeries[] => {
        const value: number | undefined = tokenUsage[key];
        if (value === undefined) {
          return [];
        }
        return [
          {
            metric,
            points: [[timestamp, value]],
            tags,
            type: 'gauge',
          },
        ];
      },
    ),
  };
};

const mapDatadogSiteToSeriesUrl = (site: string): string => {
  const hostname: string = site
    .replace(/^https?:\/\//u, '')
    .replace(/\/.*$/u, '');
  if (hostname.startsWith('api.')) {
    return `https://${hostname}/api/v1/series`;
  }
  return `https://api.${hostname}/api/v1/series`;
};

export const emitDatadogSeriesPayload = async (
  apiKey: string,
  datadogSite: string,
  payload: DatadogSeriesPayload,
  fetchFunction: typeof fetch,
): Promise<void> => {
  const response: Response = await fetchFunction(
    mapDatadogSiteToSeriesUrl(datadogSite),
    {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': apiKey,
      },
      method: 'POST',
    },
  );
  if (!response.ok) {
    throw new Error('Failed to emit Codex token usage to Datadog.', {
      cause: `${response.status} ${response.statusText}`,
    });
  }
};

export const run = async ({
  environment = process.env,
  fetchFunction = fetch,
  now = Date.now,
  stdout = process.stdout,
}: Options = {}): Promise<void> => {
  const apiKey: string | undefined = environment['DATADOG_API_KEY'];
  if (apiKey === undefined || apiKey === '') {
    stdout.write(
      'Skipping Codex token usage metrics: DATADOG_API_KEY is unset.\n',
    );
    return;
  }

  const tokenUsagePath: string | undefined =
    environment['CODEX_TOKEN_USAGE_PATH'];
  if (tokenUsagePath === undefined || tokenUsagePath === '') {
    throw new Error('Missing CODEX_TOKEN_USAGE_PATH.');
  }

  const contents: string = await readFile(tokenUsagePath, 'utf8');
  const tokenUsage: TokenUsage | null = parseCodexTokenUsage(contents);
  if (tokenUsage === null) {
    stdout.write('Skipping Codex token usage metrics: no token usage found.\n');
    return;
  }

  const payload: DatadogSeriesPayload = buildDatadogSeriesPayload(
    tokenUsage,
    environment,
    Math.floor(now() / MILLISECONDS_PER_SECOND),
  );

  await emitDatadogSeriesPayload(
    apiKey,
    environment['DATADOG_SITE'] ?? DEFAULT_DATADOG_SITE,
    payload,
    fetchFunction,
  );
  stdout.write(
    `Emitted ${payload.series.length} Codex token usage metric(s) to Datadog.\n`,
  );
};

/* istanbul ignore next -- CLI bootstrap is exercised by GitHub Actions. */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown): void => {
    let message: string = String(error);
    if (error instanceof Error) {
      message = error.message;
    }
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}
