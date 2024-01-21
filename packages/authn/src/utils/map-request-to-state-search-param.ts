import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function mapRequestToStateSearchParam(request: Request): string {
  const { searchParams }: URL = new URL(request.url);
  const state: string | null = searchParams.get('state');

  assert(
    state !== null,
    'Expected a state.',
    StatusCode.BadRequest,
    searchParams.entries(),
  );

  return state;
}
