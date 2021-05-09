// Add ESM support to react-scripts.
// https://github.com/reactioncommerce/reaction-component-library/issues/399#issuecomment-467860022
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });

  return config;
};
