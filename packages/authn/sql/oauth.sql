CREATE TABLE IF NOT EXISTS [oauth] (
  "oAuthId" VARCHAR(255) NOT NULL,
  "oAuthProvider" UNSIGNED SMALLINT NOT NULL,
  "userId" UNSIGNED INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_oAuthProvider_oAuthId ON oauth(oAuthProvider, oAuthId);
CREATE INDEX IF NOT EXISTS idx_oauth_userId ON oauth(userId);
