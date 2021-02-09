import { History, createMemoryHistory } from 'history';
import {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { Route, Router } from 'react-router';

interface Props {
  initialEntries?: string[];
  path: string;
}

interface State {
  testHistory: History<unknown>;
  TestRouter: ComponentType<PropsWithChildren<unknown>>;
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
    }: PropsWithChildren<unknown>): ReactElement {
      return (
        <Router history={testHistory}>
          <Route path={path} render={(): ReactNode => children} />
        </Router>
      );
    },
    testHistory,
  };
}
