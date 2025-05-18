import useDatadog from '../hooks/use-datadog.js';
import useGoogleAnalytics from '../hooks/use-google-analytics.js';
import useHtmlColorSchemeEffect from '../hooks/use-html-color-scheme-effect.js';
import useLogRocketInit from '../hooks/use-log-rocket-init-impl.js';
import useMixpanel from '../hooks/use-mixpanel.js';
import validateString from '../utils/validate-string.js';

const MIXPANEL_TOKEN: string = validateString(import.meta.env.MIXPANEL_TOKEN);

export default function Effects(): null {
  useDatadog();
  useGoogleAnalytics();
  useHtmlColorSchemeEffect();
  useLogRocketInit();
  useMixpanel(MIXPANEL_TOKEN);

  return null;
}
