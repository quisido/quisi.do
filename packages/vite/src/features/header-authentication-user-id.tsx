import { type ReactElement } from 'react';
import { useAuthentication } from '../contexts/authentication.js';
import setCookie from '../utils/set-cookie.js';
import { Link } from '../design-systems/template/index.js';

interface Props {
  readonly children: number;
}

interface State {
  readonly handleUnauthenticateClick: () => false;
}

const useHeaderAuthenticationUserId = (): State => {
  const { set } = useAuthentication();

  return {
    handleUnauthenticateClick(): false {
      setCookie('Authentication-ID', '', {
        expiresMs: 1,
        partitioned: true,
        path: '/',
        subdomains: true,
      });

      set({
        id: null,
      });

      return false;
    },
  };
};

export default function HeaderAuthenticationUserId({
  children,
}: Props): ReactElement {
  const { handleUnauthenticateClick } = useHeaderAuthenticationUserId();
  return (
    <div>
      <div>User #{children}</div>
      <Link href="/" onClick={handleUnauthenticateClick} title="">
        Unauthenticate
      </Link>
    </div>
  );
}
