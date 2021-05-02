import { LinkProps } from '@awsui/components-react/link';
import { History } from 'history';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

interface Props {
  to: string;
}

interface State {
  handleFollow(event: CustomEvent<LinkProps.FollowDetail>): void;
}

export default function useProjectLink({ to }: Props): State {
  const history: History<never> = useHistory();

  return {
    handleFollow: useCallback(
      (e: CustomEvent<LinkProps.FollowDetail>): void => {
        e.preventDefault();
        history.push(to);
      },
      [history, to],
    ),
  };
}
