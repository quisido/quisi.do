export const SELECT_ORIGINS_USER_ID_FROM_PROJECTS = `
  SELECT \`origins\`, \`userId\`
  FROM \`projects\`
  WHERE \`projectId\` = ?;
`;

export const SELECT_PERMISSION_FROM_KEYS = `
  SELECT \`permission\`
  FROM \`keys\`
  WHERE \`key\` = ?
  AND \`projectId\` = ?;
`;

export const SELECT_USER_ID_FROM_PROJECTS = `
  SELECT \`userId\`
  FROM \`projects\`
  WHERE \`projectId\` = ?;
`;
