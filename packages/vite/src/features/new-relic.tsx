import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import NewRelic, {
  useNewRelicBrowserAgent,
  type BrowserAgent,
} from '../modules/react-new-relic/index.js';
import { GITHUB_SHA } from '../constants/github-sha.js';
import validateString from '../utils/validate-string.js';

const LICENSE_KEY: string = validateString(
  import.meta.env.NEW_RELIC_LICENSE_KEY,
);

export default function QuisidoNewRelic({
  children,
}: PropsWithChildren): ReactElement {
  const browserAgent: BrowserAgent | null = useNewRelicBrowserAgent();

  useEffect((): void => {
    if (browserAgent === null) {
      return;
    }

    browserAgent.setApplicationVersion(GITHUB_SHA ?? null);
  }, [browserAgent]);

  return (
    <NewRelic applicationID="Test" licenseKey={LICENSE_KEY}>
      {children}
    </NewRelic>
  );
}
