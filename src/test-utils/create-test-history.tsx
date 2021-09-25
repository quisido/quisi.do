import type { History } from 'history';
import { createMemoryHistory } from 'history';
import type {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { Route, Router } from 'react-router';

interface Props {
  readonly initialEntries?: string[] | undefined;
  readonly path: string;
}

interface State {
  readonly testHistory: History<unknown>;
  readonly TestRouter: ComponentType<PropsWithChildren<unknown>>;
}

export default function createTestHistory({
  path,
  initialEntries = [path],
}: Props): State {
  const testHistory: History<unknown> = createMemoryHistory({
    initialEntries,
  });

  return {
    TestRouter: function TestRouter({
      children,
    }: Readonly<PropsWithChildren<unknown>>): ReactElement {
      return (
        <Router history={testHistory}>
          <Route path={path} render={(): ReactNode => children} />
        </Router>
      );
    },
    testHistory,
  };
}
