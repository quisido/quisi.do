import { render } from '@testing-library/react';
import createTestHistory from '../../test-utils/create-test-history';
import App from '.';

const { testHistory, TestRouter } = createTestHistory({ path: '/' });

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

    render(<App />, {
      wrapper: TestRouter,
    });

    expect(window.location.href).toBe(
      'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
    );
  });
});
