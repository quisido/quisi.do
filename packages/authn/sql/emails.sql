CREATE TABLE IF NOT EXISTS [emails] (
  "address" TEXT NOT NULL,
  "userId" UNSIGNED INTEGER NOT NULL,
  PRIMARY KEY(`address`),
  FOREIGN KEY(`userId`) REFERENCES users(`id`) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_emails_userId
ON emails(`userId`);
