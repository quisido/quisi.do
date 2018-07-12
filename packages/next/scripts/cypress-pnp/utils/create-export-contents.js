const mapPackageNameToDirectory = packageName => {
  if (packageName.indexOf('/') !== -1) {
    return '../../../../../';
  }
  return '../../../../';
};

export default function createExportContents(packageName, _export = '') {
  const directory = mapPackageNameToDirectory(packageName);

  return [
    `require('${directory}.pnp.cjs').setup();`,
    `module.exports = require('${packageName}${
      _export === '' ? '' : `/${_export}`
    }');`,
    '',
  ].join('\n');
}
