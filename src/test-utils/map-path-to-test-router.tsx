import type { ComponentType, ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

interface TestRouterProps {
  readonly children: Readonly<ReactElement>;
}

export default function mapPathToTestRouter(
  pathname: string,
): ComponentType<TestRouterProps> {
  const initialEntries: string[] = [pathname];
  return function TestRouter({
    children,
  }: Readonly<TestRouterProps>): ReactElement {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={children} path={pathname} />
        </Routes>
      </MemoryRouter>
    );
  };
}
