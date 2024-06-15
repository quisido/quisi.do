CREATE TABLE IF NOT EXISTS [keys] (
  "projectId" INTEGER NOT NULL,
  "key" TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_keys_projectId_key ON keys(`projectId`, `key`);

INSERT INTO `keys` (`projectId`, `key`)
VALUES (1, "demo");
