import { useEffect, useRef, useState, type ReactElement } from 'react';
import LoadingIcon from '../components/loading-icon.js';
import { useAuthentication } from '../contexts/authentication.js';
import AuthenticateLink from './header-authenticate-link.js';

interface State {
  readonly id: number | null;
  readonly show: boolean;
  readonly showLoading: boolean;
}

const SHOW_LOADING_TIMEOUT = 200;

function useAuthenticationState(): State {
  const { initiated, data, error, loading } = useAuthentication();
  const lastLoading = useRef(loading);
  const [showLoading, setShowLoading] = useState(false);

  lastLoading.current = loading;
  useEffect((): VoidFunction | undefined => {
    if (!loading) {
      return;
    }

    const timeout: number = window.setTimeout((): void => {
      setShowLoading(true);
    }, SHOW_LOADING_TIMEOUT);

    return (): void => {
      window.clearTimeout(timeout);
    };
  }, [loading]);

  const getShow = (): boolean => {
    if (!initiated) {
      return false;
    }

    if (loading && !showLoading) {
      return false;
    }

    if (typeof error !== 'undefined') {
      return false;
    }

    return true;
  }

  return {
    id: typeof data === 'undefined' ? null : data.id,
    show: getShow(),
    showLoading: loading && showLoading,
  };
}

export default function Authentication(): ReactElement | null {
  const { id, show, showLoading } = useAuthenticationState();

  if (!show) {
    return null;
  }

  if (showLoading) {
    return <LoadingIcon />;
  }

  if (id === null) {
    return <AuthenticateLink />;
  }

  return <>User #{id}</>;
}
