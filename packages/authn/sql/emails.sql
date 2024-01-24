CREATE TABLE [emails] (
  "address" VARCHAR(255) NOT NULL PRIMARY KEY,
  "userId" UNSIGNED INTEGER NOT NULL
);

CREATE INDEX idx_emails_userId ON emails(userId);
