export default class RootResponseHeaders extends Headers {
  public constructor(host: string) {
    super({
      location: `https://${host}/`,
    });
  }
}
