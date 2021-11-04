import { render } from '@testing-library/react';
import expect from 'expect';
import mapPathToTestRouter from '../../test-utils/map-path-to-test-router';
import Routes from './app.routes.view';

global.window = Object.create(global.window);
Object.defineProperty(global.window, 'location', {
  writable: true,
  value: {
    href: 'https://charlesstover.com',
  },
});

describe('App', (): void => {
  it('should reroute "Become the junior developer that companies want to hire" to Medium', (): void => {
    render(<Routes />, {
      wrapper: mapPathToTestRouter(
        '/become-the-junior-developer-that-companies-want-to-hire/',
      ),
    });

    expect(global.window.location.href).toBe(
      'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
    );
  });
});
