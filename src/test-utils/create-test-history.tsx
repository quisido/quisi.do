import type { History } from 'history';
import { createMemoryHistory } from 'history';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import { Route, Router } from 'react-router';

interface Props {
  readonly initialEntries?: string[] | undefined;
  readonly path: string;
}

interface State {
  readonly testHistory: History<unknown>;
  readonly TestRouter: ComponentType<TestRouterProps>;
}

interface TestRouterProps {
  readonly children: Readonly<ReactElement>;
}

export default function createTestHistory({
  path,
  initialEntries = [path],
}: Readonly<Props>): State {
  const testHistory: History<unknown> = createMemoryHistory({
    initialEntries,
  });

  return {
    testHistory,

    TestRouter: function TestRouter({
      children,
    }: Readonly<TestRouterProps>): ReactElement {
      return (
        <Router history={testHistory}>
          <Route path={path} render={(): ReactNode => children} />
        </Router>
      );
    },
  };
}
