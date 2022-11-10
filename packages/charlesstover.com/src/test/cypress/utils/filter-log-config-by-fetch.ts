interface FetchLogConfig extends Cypress.LogConfig {
  readonly url: string;
}

export default function filterLogConfigByFetch(
  options: Partial<Cypress.LogConfig>,
): options is FetchLogConfig {
  return (
    options.displayName === 'fetch' &&
    Object.prototype.hasOwnProperty.call(options, 'url')
  );
}
