import type { LinkProps } from '@awsui/components-react/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import useEffectEvent from './use-effect-event';

export interface State {
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>,
  ) => void;
}

export default function useLink(): State {
  // Contexts
  const router: AppRouterInstance = useRouter();

  return {
    handleFollow: useEffectEvent(
      (e: Readonly<CustomEvent<Readonly<LinkProps.FollowDetail>>>): void => {
        if (
          e.detail.external === true ||
          typeof e.detail.href === 'undefined'
        ) {
          return;
        }

        e.preventDefault();
        router.push(e.detail.href);
      },
    ),
  };
}
