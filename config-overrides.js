const path = require('path');

const RAW_LOADER_TEST = /\.md$/i;

const hasLoader = (rule, loader) =>
  rule.loader && (
    rule.loader === loader ||
    rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) > -1
  );

const findRuleByLoader = (rules, loader) => {
  for (const rule of rules) {
    if (Object.prototype.hasOwnProperty.call(rule, 'oneOf')) {
      const foundRule = findRuleByLoader(rule.oneOf, loader);
      if (foundRule) {
        return foundRule;
      }
    }
    if (hasLoader(rule, loader)) {
      return rule;
    }
  }
  return null;
};

function withMarkdownLoader(config) {
  const fileLoaderRule = findRuleByLoader(config.module.rules, 'file-loader');
  if (fileLoaderRule) {
    fileLoaderRule.exclude.push(RAW_LOADER_TEST);
  }
  config.module.rules.unshift({
    loader: require.resolve('raw-loader'),
    test: RAW_LOADER_TEST,
  });
  return config;
}

module.exports = function override(config) {
  return withMarkdownLoader(config);
}
