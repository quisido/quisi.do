/// <reference types="@cloudflare/workers-types" />
import { vi } from 'vitest';

export const TEST_CONSOLE_ASSERT = vi.fn();
export const TEST_CONSOLE_CLEAR = vi.fn();
export const TEST_CONSOLE_COUNT = vi.fn();
export const TEST_CONSOLE_COUNT_RESET = vi.fn();
export const TEST_CONSOLE_DEBUG = vi.fn();
export const TEST_CONSOLE_DIR = vi.fn();
export const TEST_CONSOLE_DIRXML = vi.fn();
export const TEST_CONSOLE_ERROR = vi.fn();
export const TEST_CONSOLE_GROUP = vi.fn();
export const TEST_CONSOLE_GROUP_COLLAPSED = vi.fn();
export const TEST_CONSOLE_GROUP_END = vi.fn();
export const TEST_CONSOLE_INFO = vi.fn();
export const TEST_CONSOLE_LOG = vi.fn();
export const TEST_CONSOLE_PROFILE = vi.fn();
export const TEST_CONSOLE_PROFILE_END = vi.fn();
export const TEST_CONSOLE_TABLE = vi.fn();
export const TEST_CONSOLE_TIME = vi.fn();
export const TEST_CONSOLE_TIME_END = vi.fn();
export const TEST_CONSOLE_TIME_LOG = vi.fn();
export const TEST_CONSOLE_TIME_STAMP = vi.fn();
export const TEST_CONSOLE_TRACE = vi.fn();
export const TEST_CONSOLE_WARN = vi.fn();

class TestConsole implements Console {
  public readonly assert = TEST_CONSOLE_ASSERT;
  public readonly clear = TEST_CONSOLE_CLEAR;
  public readonly Console = TestConsole;
  public readonly count = TEST_CONSOLE_COUNT;
  public readonly countReset = TEST_CONSOLE_COUNT_RESET;
  public readonly debug = TEST_CONSOLE_DEBUG;
  public readonly dir = TEST_CONSOLE_DIR;
  public readonly dirxml = TEST_CONSOLE_DIRXML;
  public readonly error = TEST_CONSOLE_ERROR;
  public readonly group = TEST_CONSOLE_GROUP;
  public readonly groupCollapsed = TEST_CONSOLE_GROUP_COLLAPSED;
  public readonly groupEnd = TEST_CONSOLE_GROUP_END;
  public readonly info = TEST_CONSOLE_INFO;
  public readonly log = TEST_CONSOLE_LOG;
  public readonly profile = TEST_CONSOLE_PROFILE;
  public readonly profileEnd = TEST_CONSOLE_PROFILE_END;
  public readonly table = TEST_CONSOLE_TABLE;
  public readonly time = TEST_CONSOLE_TIME;
  public readonly timeEnd = TEST_CONSOLE_TIME_END;
  public readonly timeLog = TEST_CONSOLE_TIME_LOG;
  public readonly timeStamp = TEST_CONSOLE_TIME_STAMP;
  public readonly trace = TEST_CONSOLE_TRACE;
  public readonly warn = TEST_CONSOLE_WARN;
}

export const TEST_CONSOLE: Console = new TestConsole();
