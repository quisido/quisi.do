import '@cypress/code-coverage/support';
import ignoreDependencyLogs from '@monorepo-template/ignore-cypress-dependency-logs';
import IGNORED_DEPENDENCY_LOCATIONS from './constants/ignored-dependency-locations';
import ignoreResizeObserverUndeliveredNotificationsError from '../../src/test/cypress/utils/ignore-resize-observer-undelivered-notifications-error';

beforeEach(ignoreResizeObserverUndeliveredNotificationsError);

beforeEach((): void => {
  ignoreDependencyLogs(IGNORED_DEPENDENCY_LOCATIONS);
});
