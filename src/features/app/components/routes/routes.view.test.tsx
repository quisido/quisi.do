import { render } from '@testing-library/react';
import expect from 'expect';
import type { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import WRITABLE_WINDOW from '../../../../test/constants/writable-window';
import Routes from './routes.view';

global.window = WRITABLE_WINDOW;

describe('App', (): void => {
  it('should reroute "Become the junior developer that companies want to hire" to Medium', (): void => {
    render(<Routes />, {
      wrapper({
        children,
      }: Readonly<PropsWithChildren<unknown>>): ReactElement {
        return (
          <MemoryRouter
            initialEntries={[
              '/become-the-junior-developer-that-companies-want-to-hire/',
            ]}
          >
            {children}
          </MemoryRouter>
        );
      },
    });

    expect(global.window.location.href).toBe(
      'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
    );
  });
});
