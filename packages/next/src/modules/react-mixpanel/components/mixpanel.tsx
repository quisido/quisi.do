'use client';

import mixpanel, { type Config } from 'mixpanel-browser';
import { useEffect } from 'react';
import useShallowMemo from 'use-shallow-memo';

interface Props extends Partial<Config> {
  readonly token: string;
}

export default function Mixpanel({ token, ...props }: Props): null {
  const config: Partial<Config> = useShallowMemo(props);

  useEffect((): VoidFunction => {
    mixpanel.init(token, config);
    return (): void => {
      mixpanel.reset();
    };
  }, [config, token]);

  return null;
}
