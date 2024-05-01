'use client';

import type { ReactElement } from "react";
import Div from "../components/div.jsx";
import Link from "../components/link/index.js";
import { useAuthentication } from "../contexts/authentication.js";
import setCookie from "../utils/set-cookie.js";

interface Props {
  readonly children: number;
}

interface State {
  readonly handleUnauthenticateClick: () => false;
}

function useHeaderAuthenticationUserId(): State {
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
}

export default function HeaderAuthenticationUserId({
  children,
}: Props): ReactElement {
  const { handleUnauthenticateClick } = useHeaderAuthenticationUserId();
  return (
    <Div>
      <Div marginBottom="small">User #{children}</Div>
      <Link
        feature="header-authentication"
        href="/"
        onClick={handleUnauthenticateClick}
        title=""
      >
        Unauthenticate
      </Link>
    </Div>
  );
}
