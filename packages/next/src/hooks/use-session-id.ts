import { useContext } from 'react';
import SessionId from '../contexts/session-id.js';

export default function useSessionId(): string {
  const id: null | string = useContext(SessionId);

  if (id === null) {
    throw new Error('Expected a session ID to be provided.');
  }

  return id;
}
