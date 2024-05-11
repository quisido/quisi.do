export const SELECT_ORIGINS_USER_ID_FROM_PROJECTS = `
  SELECT \`origins\`, \`userId\`
  FROM \`projects\`
  WHERE \`projectId\` = ?;
`;

export const SELECT_USER_ID_FROM_PROJECTS = `
  SELECT \`userId\`
  FROM \`projects\`
  WHERE \`projectId\` = ?;
`;
