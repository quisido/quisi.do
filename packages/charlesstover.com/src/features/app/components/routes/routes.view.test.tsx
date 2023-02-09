import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Routes from './routes.view';

global.window = { ...global.window };
Object.defineProperty(global.window, 'location', {
  writable: true,
  value: {
    href: 'https://charlesstover.com/',
  },
});

describe('App', (): void => {
  it('should reroute "Become the junior developer that companies want to hire" to Medium', (): void => {
    render(
      <Routes
        onCloudflareAnalyticsRequest={jest.fn()}
        onRumMetricsRequest={jest.fn()}
        onUptimeChecksRequest={jest.fn()}
      />,
      {
        wrapper({ children }: Readonly<PropsWithChildren>): ReactElement {
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
      },
    );

    expect(global.window.location.href).toBe(
      'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
    );
  });
});
