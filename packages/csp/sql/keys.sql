CREATE TABLE IF NOT EXISTS [keys] (
  "projectId" UNSIGNED INTEGER NOT NULL,
  "key" TEXT NOT NULL,
  "permission" UNSIGNED INTEGER NOT NULL,
  PRIMARY KEY(`key`),
  FOREIGN KEY(`projectId`) REFERENCES projects(`projectId`) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_keys_projectId_key
ON keys(`projectId`, `key`);

INSERT INTO `keys` (`projectId`, `key`, `permission`)
VALUES (1, "demo-post", 1);

INSERT INTO `keys` (`projectId`, `key`, `permission`)
VALUES (1, "demo-get", 2);

INSERT INTO `keys` (`projectId`, `key`, `permission`)
VALUES (1, "demo-delete", 3);
