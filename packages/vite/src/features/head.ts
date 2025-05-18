import appendMeticulous from '../utils/append-meticulous.js';
import './rocket-loader-hotfix.js';
import appendCloudflareInsights from '../utils/append-cloudflare-insights.js';
import { FontWeight } from '../constants/font-weight.js';
import appendGoogleFonts from '../utils/append-google-fonts.js';
import validateString from '../utils/validate-string.js';

if (
  import.meta.env.DEV &&
  typeof import.meta.env.METICULOUS_RECORDING_TOKEN === 'string'
) {
  appendMeticulous(
    import.meta.env.METICULOUS_RECORDING_TOKEN,
    import.meta.env.PROD,
    'nonce-quisido',
  );
}

if (import.meta.env.PROD) {
  appendCloudflareInsights(
    validateString(import.meta.env.CLOUDFLARE_INSIGHTS_TOKEN),
    'nonce-quisido',
  );
}

appendGoogleFonts(
  {
    Cairo_Play: [FontWeight.Normal, FontWeight.Bold],
    Merienda: [FontWeight.Normal, FontWeight.Bold],
    Noto_Color_Emoji: FontWeight.Normal,
    Noto_Sans: [FontWeight.Normal, FontWeight.Bold],
    Noto_Sans_Display: FontWeight.Bold,
    Pangolin: FontWeight.Normal,
    Protest_Revolution: FontWeight.Normal,
  },
  'nonce-quisido',
);
