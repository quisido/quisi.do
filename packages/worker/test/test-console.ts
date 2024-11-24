/// <reference types="@cloudflare/workers-types" />
import { vi } from 'vitest';

export const TEST_CONSOLE_ERROR = vi.fn();
export const TEST_CONSOLE_LOG = vi.fn();
export const TEST_CONSOLE_WARN = vi.fn();

class TestConsole implements Console {
  public assert = vi.fn();
  public clear = vi.fn();
  public Console = TestConsole;
  public count = vi.fn();
  public countReset = vi.fn();
  public debug = vi.fn();
  public dir = vi.fn();
  public dirxml = vi.fn();
  public error = TEST_CONSOLE_ERROR;
  public group = vi.fn();
  public groupCollapsed = vi.fn();
  public groupEnd = vi.fn();
  public info = vi.fn();
  public log = TEST_CONSOLE_LOG;
  public profile = vi.fn();
  public profileEnd = vi.fn();
  public table = vi.fn();
  public time = vi.fn();
  public timeEnd = vi.fn();
  public timeLog = vi.fn();
  public timeStamp = vi.fn();
  public trace = vi.fn();
  public warn = TEST_CONSOLE_WARN;
}

export const TEST_CONSOLE: Console = new TestConsole();
