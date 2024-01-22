CREATE TABLE [emails] (
  "userId" UNSIGNED INTEGER NOT NULL,
  "address" VARCHAR(255) NOT NULL PRIMARY KEY
)

CREATE INDEX idx_emails_userId ON emails(userId)

--------------------------------------------------------------------------------

CREATE TABLE [oauth] (
  "provider" UNSIGNED SMALLINT NOT NULL,
  "oauthId" VARCHAR(255) NOT NULL,
  "userId" UNSIGNED INTEGER NOT NULL
)

CREATE INDEX idx_oauth_provider_oAuthId ON oauth(provider, oauthId)
CREATE INDEX idx_oauth_userId ON oauth(userId)

--------------------------------------------------------------------------------

CREATE TABLE [users] (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "firstName" VARCHAR(255) NOT NULL,
  "fullName" VARCHAR(255) NOT NULL,
  "registrationTimestamp" UNSIGNED INTEGER NOT NULL,
  "gender" UNSIGNED TINYINT NOT NULL DEFAULT 0
)
