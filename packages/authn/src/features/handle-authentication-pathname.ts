import { AuthenticationPathname } from '../constants/authentication-pathname.js';
import handlePatreonFetchRequest from './patreon/handle-patreon-fetch-request.js';

export default async function handleAuthenticationPathname(
  pathname: AuthenticationPathname,
): Promise<Response> {
  switch (pathname) {
    case AuthenticationPathname.Patreon:
      return await handlePatreonFetchRequest();
  }
}
