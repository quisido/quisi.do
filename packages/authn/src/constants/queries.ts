export const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

export const INSERT_INTO_OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`userId\`, \`oAuthProvider\`, \`oAuthId\`)
VALUES (?, ?, ?);
`;

export const INSERT_INTO_USERS_QUERY = `
INSERT INTO \`users\` (
  \`firstName\`,
  \`fullName\`,
  \`gender\`,
  \`registrationTimestamp\`
)
VALUES (?, ?, ?, ?);
`;

export const SELECT_USERID_FROM_OAUTH_QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oAuthProvider\` = ?
  AND \`oAuthId\` = ?
LIMIT 1;
`;
