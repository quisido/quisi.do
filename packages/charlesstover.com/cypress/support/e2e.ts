import '@cypress/code-coverage/support';
import ignoreOptionalDependencies from '../../src/test/cypress/utils/ignore-optional-dependencies';
import ignoreResizeObserverUndeliveredNotificationsError from '../../src/test/cypress/utils/ignore-resize-observer-undelivered-notifications-error';

beforeEach(ignoreOptionalDependencies);
beforeEach(ignoreResizeObserverUndeliveredNotificationsError);
