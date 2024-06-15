-- https://w3c.github.io/webappsec-csp/#reporting

CREATE TABLE IF NOT EXISTS [reports] (
  "project" INTEGER NOT NULL,
  "timestamp" INTEGER NOT NULL,
  "documentURL" TEXT NOT NULL,
  "referrer" TEXT DEFAULT NULL,
  "blockedURL" TEXT DEFAULT NULL,
  "effectiveDirective" TEXT NOT NULL,
  "originalPolicy" TEXT NOT NULL,
  "sourceFile" TEXT DEFAULT NULL,
  "sample" TEXT DEFAULT NULL,
  "disposition" TEXT NOT NULL,
  "statusCode" INTEGER NOT NULL,
  "lineNumber" INTEGER DEFAULT NULL,
  "columnNumber" INTEGER DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_reports_project_blockedURL ON reports(`project`, `blockedURL`);
CREATE INDEX IF NOT EXISTS idx_reports_project_documentURL ON reports(`project`, `documentURL`);
CREATE INDEX IF NOT EXISTS idx_reports_project ON reports(`project`);
