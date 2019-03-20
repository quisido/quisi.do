export default class ResponseInitImpl implements ResponseInit {
  public readonly headers?: HeadersInit;

  public readonly status?: number;

  public readonly statusText?: string;

  public constructor({ headers, status, statusText }: ResponseInit) {
    if (typeof headers !== 'undefined') {
      this.headers = headers;
    }

    if (typeof status !== 'undefined') {
      this.status = status;
    }

    if (typeof statusText !== 'undefined') {
      this.statusText = statusText;
    }
  }
}
