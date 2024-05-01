export enum WhoAmIResponseCode {
  Cached = 2,
  InvalidAuthnId = 3,
  MissingAuthnId = 1,
  Throttled = 429,
  Uncached = 4,
}
