import useDatadog from '../hooks/use-datadog.js';
import useGoogleAnalytics from '../hooks/use-google-analytics.js';
import useHtmlColorSchemeEffect from '../hooks/use-html-color-scheme-effect.js';
import useLogRocketInit from '../hooks/use-log-rocket-init-impl.js';
import useMixpanel from '../hooks/use-mixpanel.js';

export default function Effects(): null {
  useDatadog();
  useGoogleAnalytics();
  useHtmlColorSchemeEffect();
  useLogRocketInit();
  useMixpanel('2066f9605c25614b4297e8ae53d8dc23');

  return null;
}
