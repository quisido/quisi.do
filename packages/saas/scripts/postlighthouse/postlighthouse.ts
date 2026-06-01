/// <reference types="node" />
import { type Result } from 'lighthouse';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import mapAuditResultToString from './utils/map-audit-result-to-string.js';
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

  // Mixpanel tracks events with an `img` element that lacks an `alt` attribute.
  'image-alt',
]);

if (!existsSync(REPORT_PATH)) {
  throw new Error(`Expected Lighthouse report to exist at path: ${REPORT_PATH}

Did you forget to run \`npm run lighthouse\`?`);
}

const resultStr = readFileSync(REPORT_PATH).toString();
const result = JSON.parse(resultStr) as Result;
const { audits } = result;

const failures: string[] = [];
for (const audit of Object.values(audits)) {
  const { id, score, scoreDisplayMode } = audit;

  if (IGNORED_AUDITS.has(id)) {
    continue;
  }

  if (scoreDisplayMode === 'binary' && score !== PERFECT) {
    failures.push(mapAuditResultToString(audit));
  }
}

if (failures.length > EMPTY) {
  throw new Error(`Failed audits:

${failures.join('\n\n')}`);
}

const dashboard = mapResultToDashboard(result);
writeFileSync(DASHBOARD_PATH, dashboard);
