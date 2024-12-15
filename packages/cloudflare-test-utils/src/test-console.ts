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
  public assert = TEST_CONSOLE_ASSERT;
  public clear = TEST_CONSOLE_CLEAR;
  public Console = TestConsole;
  public count = TEST_CONSOLE_COUNT;
  public countReset = TEST_CONSOLE_COUNT_RESET;
  public debug = TEST_CONSOLE_DEBUG;
  public dir = TEST_CONSOLE_DIR;
  public dirxml = TEST_CONSOLE_DIRXML;
  public error = TEST_CONSOLE_ERROR;
  public group = TEST_CONSOLE_GROUP;
  public groupCollapsed = TEST_CONSOLE_GROUP_COLLAPSED;
  public groupEnd = TEST_CONSOLE_GROUP_END;
  public info = TEST_CONSOLE_INFO;
  public log = TEST_CONSOLE_LOG;
  public profile = TEST_CONSOLE_PROFILE;
  public profileEnd = TEST_CONSOLE_PROFILE_END;
  public table = TEST_CONSOLE_TABLE;
  public time = TEST_CONSOLE_TIME;
  public timeEnd = TEST_CONSOLE_TIME_END;
  public timeLog = TEST_CONSOLE_TIME_LOG;
  public timeStamp = TEST_CONSOLE_TIME_STAMP;
  public trace = TEST_CONSOLE_TRACE;
  public warn = TEST_CONSOLE_WARN;
}

export const TEST_CONSOLE: Console = new TestConsole();
