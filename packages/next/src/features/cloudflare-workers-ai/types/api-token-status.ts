interface Error {
  readonly status: 'error';
  readonly message: string;
}

type ApiTokenStatus = Error | Loading | Success | Uninitiated;

interface Loading {
  readonly status: 'loading';
}

interface Success {
  readonly status: 'success';
  readonly data: unknown;
}

interface Uninitiated {
  readonly status: 'uninitiated';
}

export default ApiTokenStatus;
