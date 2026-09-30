import mixpanel, { type Config } from 'mixpanel-browser';
import { useEffect } from 'react';
import useShallowMemo from 'use-shallow-memo';

interface Props extends Partial<Config> {
  readonly token: string;
}

export default function useMixpanel({ token, ...props }: Props): void {
  const config: Partial<Config> = useShallowMemo(props);

  useEffect((): VoidFunction => {
    // Mixpanel TypeScript definition is wrong; only `default` is exported.
    // eslint-disable-next-line import-x/no-named-as-default-member
    mixpanel.init(token, config);

    return (): void => {
      // Mixpanel TypeScript definition is wrong; only `default` is exported.
      // eslint-disable-next-line import-x/no-named-as-default-member
      mixpanel.reset();
    };
  }, [config, token]);
}
