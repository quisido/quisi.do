import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default function mapPathToTestRouter(
  pathname: string,
): ComponentType<PropsWithChildren<unknown>> {
  const initialEntries: string[] = [pathname];
  return function TestRouter({
    children,
  }: Readonly<PropsWithChildren<unknown>>): ReactElement {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<>{children}</>} path={pathname} />
        </Routes>
      </MemoryRouter>
    );
  };
}
