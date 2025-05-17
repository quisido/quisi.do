const NOT_FOUND = -1;

const mapExportToPathname = (_export = '') => {
  if (_export === '') {
    return '';
  }

  return `/${_export}`;
};

const mapPackageNameToDirectory = packageName => {
  if (packageName.indexOf('/') !== NOT_FOUND) {
    return '../../../../../';
  }
  return '../../../../';
};

export default function createExportContents(packageName, _export) {
  const directory = mapPackageNameToDirectory(packageName);
  const pathname = mapExportToPathname(_export);
  return [
    `require('${directory}.pnp.cjs').setup();`,
    `module.exports = require('${packageName}${pathname}');`,
    '',
  ].join('\n');
}
