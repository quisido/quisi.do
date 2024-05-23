/// <reference types="@cloudflare/workers-types" />
import { describe, expect, it, vi } from 'vitest';
import { isConsole } from "./index.js";

describe('isConsole', (): void => {
  it('should identify console interfaces', (): void => {
    expect(isConsole(true)).toBe(false);
    expect(isConsole(null)).toBe(false);
    expect(isConsole({})).toBe(false);

    expect(isConsole({
      assert: vi.fn(),
      clear: vi.fn(),
      count: vi.fn(),
      countReset: vi.fn(),
      debug: vi.fn(),
      dir: vi.fn(),
      dirxml: vi.fn(),
      error: vi.fn(),
      group: vi.fn(),
      groupCollapsed: vi.fn(),
      groupEnd: vi.fn(),
      info: vi.fn(),
      log: vi.fn(),
      table: vi.fn(),
      time: vi.fn(),
      timeEnd: vi.fn(),
      timeLog: vi.fn(),
      timeStamp: vi.fn(),
      trace: vi.fn(),
      warn: vi.fn(),
    })).toBe(true);
  });
});
