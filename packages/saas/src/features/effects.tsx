import useGoogleAnalytics from '../hooks/use-google-analytics.js';
import useHtmlColorSchemeEffect from '../hooks/use-html-color-scheme-effect.js';
import useLogRocketInit from '../hooks/use-log-rocket-init-impl.js';
import useSentry from '../hooks/use-sentry.js';

export default function Effects(): null {
  useGoogleAnalytics();
  useHtmlColorSchemeEffect();
  useLogRocketInit();
  useSentry();

  return null;
}
