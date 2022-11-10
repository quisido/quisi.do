import OPTIONAL_DEPENDENCY_LOCATIONS from '../constants/optional-dependency-locations';
import type XhrConsoleProps from '../types/xhr-console-props';
import filterLogConfigByFetch from './filter-log-config-by-fetch';
import filterLogConfigByXhr from './filter-log-config-by-xhr';

interface CypressLog {
  log: (options: Partial<Cypress.LogConfig>) => Cypress.Log | undefined;
}

declare const Cypress: CyEventEmitter & Cypress.Cypress & CypressLog;

const cypressLog = Cypress.log;

export default function ignoreOptionalDependencies(): void {
  function log(options: Partial<Cypress.LogConfig>): Cypress.Log;
  function log(options: Partial<Cypress.LogConfig>): Cypress.Log | undefined {
    // Fetch logs
    if (filterLogConfigByFetch(options)) {
      const filterByUrl = (location: string): boolean =>
        options.url.includes(location);
      if (OPTIONAL_DEPENDENCY_LOCATIONS.some(filterByUrl)) {
        return;
      }
      return cypressLog(options);
    }

    // XHR logs
    if (filterLogConfigByXhr(options)) {
      const consoleProps: XhrConsoleProps = options.consoleProps();
      const filterByUrl = (location: string): boolean =>
        consoleProps.URL.includes(location);
      if (OPTIONAL_DEPENDENCY_LOCATIONS.some(filterByUrl)) {
        return;
      }
      console.log(options, consoleProps);
      return cypressLog(options);
    }

    // All other logs
    return cypressLog(options);
  }

  Cypress.log = log;
}
