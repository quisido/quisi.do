CREATE TABLE IF NOT EXISTS [oauth] (
  "oauthId" VARCHAR(255) NOT NULL,
  "oauthProvider" UNSIGNED SMALLINT NOT NULL,
  "userId" UNSIGNED INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_provider_oAuthId ON oauth(oauthProvider, oauthId);
CREATE INDEX IF NOT EXISTS idx_oauth_userId ON oauth(userId);
