import { vi } from 'vitest';

export default class TestD1Database implements D1Database {
  readonly batch = vi.fn();
  readonly dump = vi.fn();
  readonly exec = vi.fn();
  readonly prepare = vi.fn();
}
