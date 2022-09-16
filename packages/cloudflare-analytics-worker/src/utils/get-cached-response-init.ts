import mapResponseToResponseInit from './map-response-to-response-init';

interface Options {
  readonly origin: string | null;
  readonly response: Response;
}

export default function getCachedResponseInit({
  origin,
  response,
}: Readonly<Options>): ResponseInit {
  const responseInit: ResponseInit = mapResponseToResponseInit(response);

  if (origin === null) {
    return responseInit;
  }

  return {
    ...responseInit,
    headers: {
      ...responseInit.headers,
      'Access-Control-Allow-Origin': origin,
    },
  };
}
