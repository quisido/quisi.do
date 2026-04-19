/// <reference types="@cloudflare/workers-types" />

import { describe, expect, it, vi } from 'vitest';
import app from './index.js';

const MOCK_ITEMS = [
  { created_at: '2024-01-01T00:00:00Z', id: 1, name: 'First Item' },
  { created_at: '2024-01-02T00:00:00Z', id: 2, name: 'Second Item' },
];

const MOCK_CREATED_ITEM = {
  created_at: '2024-01-03T00:00:00Z',
  id: 3,
  name: 'New Item',
};

const PLACEHOLDER_DB = {} as unknown as D1Database;
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_PAYLOAD_TOO_LARGE = 413;
const STATUS_UNSUPPORTED_MEDIA_TYPE = 415;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const MAX_NAME_LENGTH_PLUS_ONE = 256;
const OVERSIZED_NAME_LENGTH = 2000;
const JSON_HEADERS = { 'Content-Type': 'application/json' };

const createSelectDb = (results: readonly unknown[] = MOCK_ITEMS): D1Database =>
  ({
    prepare: () => ({
      all: () =>
        Promise.resolve({ meta: {}, results: [...results], success: true }),
    }),
  }) as unknown as D1Database;

const createInsertDb = (result: unknown = MOCK_CREATED_ITEM): D1Database =>
  ({
    prepare: () => ({
      bind: () => ({ first: () => Promise.resolve(result) }),
    }),
  }) as unknown as D1Database;

const createErrorDb = (): D1Database => {
  const error = new Error('database connection failed');
  return {
    prepare: () => ({
      all: () => Promise.reject(error),
      bind: () => ({ first: () => Promise.reject(error) }),
    }),
  } as unknown as D1Database;
};

const postItems = (
  body: string,
  db: D1Database = PLACEHOLDER_DB,
  headers: Record<string, string> = JSON_HEADERS,
): Promise<Response> =>
  app.request('/items', { body, headers, method: 'POST' }, { DB: db });

describe('api', () => {
  describe('CORS', () => {
    it('includes CORS headers for allowed origins', async () => {
      const response = await app.request('/health', {
        headers: { Origin: 'https://quisi.do' },
      });
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe(
        'https://quisi.do',
      );
    });

    it('excludes CORS headers for disallowed origins', async () => {
      const response = await app.request('/health', {
        headers: { Origin: 'https://evil.com' },
      });
      expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    });

    it('handles preflight requests for allowed origins', async () => {
      const response = await app.request('/health', {
        headers: {
          'Access-Control-Request-Headers': 'Content-Type',
          'Access-Control-Request-Method': 'POST',
          Origin: 'https://quisi.do',
        },
        method: 'OPTIONS',
      });
      expect(response.status).toBe(STATUS_NO_CONTENT);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe(
        'https://quisi.do',
      );
      expect(response.headers.get('Access-Control-Allow-Methods')).toContain(
        'GET',
      );
    });
  });

  describe('security headers', () => {
    it('includes protective security headers', async () => {
      const response = await app.request('/health');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
    });
  });

  describe('GET /health', () => {
    it('returns status ok', async () => {
      const response = await app.request('/health');
      expect(response.status).toBe(STATUS_OK);
      expect(await response.json()).toEqual({ status: 'ok' });
    });
  });

  describe('GET /items', () => {
    it('returns items from D1', async () => {
      const response = await app.request(
        '/items',
        {},
        { DB: createSelectDb() },
      );
      expect(response.status).toBe(STATUS_OK);
      expect(await response.json()).toEqual({ items: MOCK_ITEMS });
    });

    it('returns 500 when the database is unavailable', async () => {
      const response = await app.request('/items', {}, { DB: createErrorDb() });
      expect(response.status).toBe(STATUS_INTERNAL_SERVER_ERROR);
      expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /items', () => {
    it('returns 413 when the body exceeds the size limit', async () => {
      const oversizedBody = JSON.stringify({
        name: 'a'.repeat(OVERSIZED_NAME_LENGTH),
      });
      const response = await app.request(
        '/items',
        {
          body: oversizedBody,
          headers: {
            'Content-Length': String(oversizedBody.length),
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
        { DB: PLACEHOLDER_DB },
      );
      expect(response.status).toBe(STATUS_PAYLOAD_TOO_LARGE);
      expect(await response.json()).toEqual({ error: 'Payload Too Large' });
    });

    it('returns 415 when Content-Type is not application/json', async () => {
      const response = await postItems('{"name":"test"}', PLACEHOLDER_DB, {
        'Content-Type': 'text/plain',
      });
      expect(response.status).toBe(STATUS_UNSUPPORTED_MEDIA_TYPE);
      expect(await response.json()).toEqual({
        error: 'Content-Type must be application/json',
      });
    });

    it('returns 400 for malformed JSON', async () => {
      const response = await postItems('not valid json');
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({ error: 'Invalid JSON body' });
    });

    it('returns 400 when the body is not an object', async () => {
      const response = await postItems('"just a string"');
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name is required and must be a string',
      });
    });

    it('returns 400 when the body is null', async () => {
      const response = await postItems('null');
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name is required and must be a string',
      });
    });

    it('returns 400 when name is missing', async () => {
      const response = await postItems(JSON.stringify({ description: 'x' }));
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name is required and must be a string',
      });
    });

    it('returns 400 when name is not a string', async () => {
      const response = await postItems(JSON.stringify({ name: true }));
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name is required and must be a string',
      });
    });

    it('returns 400 when name is empty', async () => {
      const response = await postItems(JSON.stringify({ name: '' }));
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name must not be empty',
      });
    });

    it('returns 400 when name is only whitespace', async () => {
      const response = await postItems(JSON.stringify({ name: '   ' }));
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name must not be empty',
      });
    });

    it('returns 400 when name exceeds the maximum length', async () => {
      const response = await postItems(
        JSON.stringify({ name: 'a'.repeat(MAX_NAME_LENGTH_PLUS_ONE) }),
      );
      expect(response.status).toBe(STATUS_BAD_REQUEST);
      expect(await response.json()).toEqual({
        error: 'name must be 255 characters or fewer',
      });
    });

    it('creates an item with valid input', async () => {
      const response = await postItems(
        JSON.stringify({ name: 'New Item' }),
        createInsertDb(),
      );
      expect(response.status).toBe(STATUS_CREATED);
      expect(await response.json()).toEqual({ item: MOCK_CREATED_ITEM });
    });

    it('trims whitespace from the name', async () => {
      const bindFn = vi.fn().mockReturnValue({
        first: () => Promise.resolve(MOCK_CREATED_ITEM),
      });
      const db = { prepare: () => ({ bind: bindFn }) } as unknown as D1Database;
      await postItems(JSON.stringify({ name: '  Trimmed  ' }), db);
      expect(bindFn).toHaveBeenCalledWith('Trimmed');
    });

    it('returns 500 when the database insert fails', async () => {
      const response = await postItems(
        JSON.stringify({ name: 'Test' }),
        createErrorDb(),
      );
      expect(response.status).toBe(STATUS_INTERNAL_SERVER_ERROR);
      expect(await response.json()).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('unknown routes', () => {
    it('returns 404 for unrecognized paths', async () => {
      const response = await app.request('/nonexistent');
      expect(response.status).toBe(STATUS_NOT_FOUND);
      expect(await response.json()).toEqual({ error: 'Not Found' });
    });
  });
});
