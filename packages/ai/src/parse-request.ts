/// <reference types="../worker-configuration.d.ts" />

export default async function parseRequest(
  request: Request,
): Promise<Record<string, unknown>> {
  try {
    const json: unknown = await request.json();
    if (typeof json !== 'object') {
      throw new Error('Received a non-object request body.', {
        cause: json,
      });
    }

    if (json === null) {
      throw new Error('Received an empty request body.');
    }

    return { ...json };
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('Invalid input:', err);
    return {};
  }
}
