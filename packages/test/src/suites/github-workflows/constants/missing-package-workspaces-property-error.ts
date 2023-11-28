const MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR: Error = new Error(
  'Expected `package.json` to have a `workspaces` property.',
);

export default MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR;
