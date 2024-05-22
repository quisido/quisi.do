import { expect } from 'vitest';
import StatusCode from '../constants/status-code.js';

export default function expectResponseToRedirectTo(
  { headers, status }: Response,
  to: string,
): void {
  expect(headers.get('Content-Location')).toBe(to);
  expect(headers.get('Location')).toBe(to);
  expect(status).toBe(StatusCode.SeeOther);
}
