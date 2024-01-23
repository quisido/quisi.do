CREATE TABLE [emails] (
  "address" VARCHAR(255) NOT NULL PRIMARY KEY,
  "userId" UNSIGNED INTEGER NOT NULL
)

CREATE INDEX idx_emails_userId ON emails(userId)

--------------------------------------------------------------------------------

CREATE TABLE [oauth] (
  "oauthId" VARCHAR(255) NOT NULL,
  "oauthProvider" UNSIGNED SMALLINT NOT NULL,
  "userId" UNSIGNED INTEGER NOT NULL
)

CREATE INDEX idx_oauth_provider_oAuthId ON oauth(oauthProvider, oauthId)
CREATE INDEX idx_oauth_userId ON oauth(userId)

--------------------------------------------------------------------------------

CREATE TABLE [users] (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "firstName" VARCHAR(255) NOT NULL,
  "fullName" VARCHAR(255) NOT NULL,
  "gender" UNSIGNED TINYINT NOT NULL DEFAULT 0,
  "registrationTimestamp" UNSIGNED INTEGER NOT NULL
)
