import type { ReactElement } from 'react';
import { Redirect } from 'react-router';

export default function mapPathToRedirect(path: string): () => ReactElement {
  return function RedirectToPath(): ReactElement {
    return <Redirect to={path} />;
  };
}
