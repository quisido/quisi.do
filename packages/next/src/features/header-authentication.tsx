import type { ReactElement } from 'react';
import LoadingIcon from '../components/loading-icon.js';
import { useAuthentication } from '../contexts/authentication.js';
import AuthenticateLink from './header-authenticate-link.js';

export default function Authentication(): ReactElement | null {
  const { initiated, data, error, loading } = useAuthentication();

  if (!initiated || typeof error !== 'undefined') {
    return null;
  }

  if (loading) {
    return <LoadingIcon />;
  }

  const { id } = data;
  if (id === null) {
    return <AuthenticateLink />;
  }

  return <>User #{id}</>;
}
