import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapRequestSearchParamsToCode(
  searchParams: URLSearchParams,
): string {
  const code: string | null = searchParams.get('code');

  assert(
    code !== null,
    'Expected a code.',
    StatusCode.Unauthorized,
    searchParams.toString(),
  );

  return code;
}
