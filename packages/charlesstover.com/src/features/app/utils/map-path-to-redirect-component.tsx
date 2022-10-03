import type { ComponentType, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export default function mapPathToRedirectComponent(
  path: string,
): ComponentType<unknown> {
  return function PathRedirect(): ReactElement {
    return <Navigate to={path} />;
  };
}
