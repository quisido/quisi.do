export default interface RumMetricsError {
  /*
   * For a missing API key, the message is "Forbidden".
   * For an invalid API key, the message is "Unauthorized".
   * For all other errors, the message can be any string.
   */
  readonly message: string;
}
