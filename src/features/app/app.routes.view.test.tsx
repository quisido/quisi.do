import { render } from '@testing-library/react';
import expect from 'expect';
import createTestHistory from '../../test-utils/create-test-history';
import Routes from './app.routes.view';

const { testHistory, TestRouter } = createTestHistory({ path: '/' });

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    href: 'https://charlesstover.com',
  },
});

describe('App', (): void => {
  it('should reroute "Become the junior developer that companies want to hire" to Medium', (): void => {
    testHistory.replace({
      pathname: '/become-the-junior-developer-that-companies-want-to-hire/',
    });

    render(<Routes />, {
      wrapper: TestRouter,
    });

    expect(window.location.href).toBe(
      'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
    );
  });
});
