/// <reference types="@cloudflare/workers-types" />

import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

interface Bindings {
  readonly DB: D1Database;
}

const MAX_BODY_BYTES = 1024;
const MAX_NAME_LENGTH = 255;
const PREFLIGHT_CACHE_SECONDS = 86_400;
const STATUS_BAD_REQUEST = 400;
const STATUS_CREATED = 201;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_NOT_FOUND = 404;
const STATUS_PAYLOAD_TOO_LARGE = 413;
const STATUS_UNSUPPORTED_MEDIA_TYPE = 415;

const isItemInput = (value: unknown): value is { readonly name: string } =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  typeof (value as Record<string, unknown>).name === 'string';

const parseItemName = (
  body: unknown,
): { readonly error: string } | { readonly name: string } => {
  if (!isItemInput(body)) {
    return { error: 'name is required and must be a string' };
  }

  const name = body.name.trim();

  if (name.length === 0) {
    return { error: 'name must not be empty' };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return {
      error: `name must be ${String(MAX_NAME_LENGTH)} characters or fewer`,
    };
  }

  return { name };
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  '*',
  cors({
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    maxAge: PREFLIGHT_CACHE_SECONDS,
    origin: ['https://quisi.do'],
  }),
);

app.use('*', secureHeaders());

app.get('/health', ctx => ctx.json({ status: 'ok' }));

app.get('/items', async ctx => {
  const { results } = await ctx.env.DB.prepare(
    'SELECT id, name, created_at FROM items ORDER BY created_at DESC',
  ).all();
  return ctx.json({ items: results });
});

app.post(
  '/items',
  bodyLimit({
    maxSize: MAX_BODY_BYTES,
    onError: ctx =>
      ctx.json({ error: 'Payload Too Large' }, STATUS_PAYLOAD_TOO_LARGE),
  }),
  async ctx => {
    const contentType = ctx.req.header('content-type');
    if (!contentType?.includes('application/json')) {
      return ctx.json(
        { error: 'Content-Type must be application/json' },
        STATUS_UNSUPPORTED_MEDIA_TYPE,
      );
    }

    const body: unknown = await ctx.req.json().catch(() => undefined);
    if (body === undefined) {
      return ctx.json({ error: 'Invalid JSON body' }, STATUS_BAD_REQUEST);
    }

    const parsed = parseItemName(body);
    if ('error' in parsed) {
      return ctx.json({ error: parsed.error }, STATUS_BAD_REQUEST);
    }

    const item = await ctx.env.DB.prepare(
      'INSERT INTO items (name) VALUES (?) RETURNING id, name, created_at',
    )
      .bind(parsed.name)
      .first();

    return ctx.json({ item }, STATUS_CREATED);
  },
);

app.notFound(ctx => ctx.json({ error: 'Not Found' }, STATUS_NOT_FOUND));

app.onError((_err, ctx) =>
  ctx.json({ error: 'Internal Server Error' }, STATUS_INTERNAL_SERVER_ERROR),
);

export default app;
