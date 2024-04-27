import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import mapAuditToString from './utils/map-audit-to-string.js';
import mapResultToDashboard from './utils/map-result-to-dashboard.js';

const CWD = process.cwd();
const DASHBOARD_PATH = `${CWD}/public/dashboard.json`;
const EMPTY = 0;
const PERFECT = 1;
const REPORT_PATH = `${CWD}/lighthouse.report.json`;

const IGNORED_AUDITS = new Set([
  'color-contrast',
  'crawlable-anchors',
  'image-size-responsive',
  'service-worker',

  // `zone.js` uses `UnloadHandler`.
  'deprecations',

  // Mixpanel tracks events with an `img` element that lacks an `alt` attribute.
  'image-alt',

  // `zone.js` uses an unload listener.
  'no-unload-listeners',
]);

if (!existsSync(REPORT_PATH)) {
  throw new Error(`Expected Lighthouse report to exist at path: ${REPORT_PATH}

Did you forget to run \`yarn run lighthouse\`?`);
}

const resultStr = readFileSync(REPORT_PATH).toString();
const result = JSON.parse(resultStr);
const { audits } = result;

const failures = [];
for (const { id, score, scoreDisplayMode, ...audit } of Object.values(audits)) {
  if (IGNORED_AUDITS.has(id)) {
    continue;
  }

  if (scoreDisplayMode === 'binary' && score !== PERFECT) {
    failures.push(
      mapAuditToString({
        ...audit,
        id,
      }),
    );
  }
}

if (failures.length > EMPTY) {
  throw new Error(`Failed audits:

${failures.join('\n\n')}`);
}

const dashboard = mapResultToDashboard(result);
writeFileSync(DASHBOARD_PATH, dashboard);
