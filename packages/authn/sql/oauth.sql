CREATE TABLE IF NOT EXISTS [oauth] (
  "userId" UNSIGNED INTEGER NOT NULL,
  "oAuthProvider" UNSIGNED INTEGER NOT NULL,
  "oAuthId" TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_oAuthProvider_oAuthId ON oauth(oAuthProvider, oAuthId);
CREATE INDEX IF NOT EXISTS idx_oauth_userId ON oauth(userId);
