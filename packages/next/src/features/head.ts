import appendMeticulous from '../utils/append-meticulous.js';
import './clarity.js';
import './rocket-loader-hotfix.js';
import appendCloudflareInsights from '../utils/append-cloudflare-insights.js';
import { FontWeight } from '../constants/font-weight.js';
import appendGoogleFonts from '../utils/append-google-fonts.js';
import validateString from '../utils/validate-string.js';

const { CLOUDFLARE_INSIGHTS_TOKEN, DEV, METICULOUS_RECORDING_TOKEN, PROD } =
  import.meta.env;

if (DEV && typeof METICULOUS_RECORDING_TOKEN === 'string') {
  appendMeticulous(METICULOUS_RECORDING_TOKEN, PROD, 'nonce-quisido');
}

if (PROD) {
  appendCloudflareInsights(
    validateString(CLOUDFLARE_INSIGHTS_TOKEN),
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
