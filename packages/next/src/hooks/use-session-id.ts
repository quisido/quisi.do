import { useContext } from 'react';
import SessionId from '../contexts/session-id.js';

/**
 *   Since a session ID is generated by the client, it won't exist until after
 * the page hydrates.
 */
export default function useSessionId(): string | undefined {
  const id: null | string | undefined = useContext(SessionId);

  if (id === null) {
    throw new Error('Expected a session ID to be provided.');
  }

  return id;
}
