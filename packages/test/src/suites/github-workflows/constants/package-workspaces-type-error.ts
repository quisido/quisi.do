const PACKAGE_WORKSPACES_TYPE_ERROR: Error = new Error(
  'Expected `package.json`’s `workspaces` property to be an array of strings.',
);

export default PACKAGE_WORKSPACES_TYPE_ERROR;
