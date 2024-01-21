import type StatusCode from '../constants/status-code.js';

export default function createErrorResponse(
  message: string,
  status: StatusCode,
): Response {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status,
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    },
  );
}
