import type { LinkProps } from '@awsui/components-react/link';
import type { History } from 'history';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

interface Props {
  readonly to: string;
}

interface State {
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>,
  ) => void;
}

export default function useProjectLink({ to }: Props): State {
  const history: History<never> = useHistory();

  return {
    handleFollow: useCallback(
      (e: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>): void => {
        e.preventDefault();
        history.push(to);
      },
      [history, to],
    ),
  };
}
