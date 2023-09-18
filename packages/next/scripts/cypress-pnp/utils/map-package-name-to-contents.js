export default function mapPackageNameToContents(name) {
  return [
    "require('../../../../.pnp.cjs').setup();",
    `module.exports = require('${name}');`,
    '',
  ].join('\n');
}
