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
  readonly initialEntries?: string[];
  readonly path: string;
}

interface State {
  readonly testHistory: History<unknown>;
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
