export default class InternalServerErrorResponseHeaders extends Headers {
  public constructor(accessControlAllowOrigin: string) {
    super({
      'access-control-allow-origin': accessControlAllowOrigin,
      'content-type': 'application/json; charset=utf-8',
    });
  }
}
