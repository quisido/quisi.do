// Don't process node_modules except for AWS UI.
module.exports = {
  presets: ['@babel/preset-env'],
  ignore: [
    /node_modules\/?!@awsui\/components-react/,
    /node_modules\/?!@cloudscape-design\/components/,
  ],
};
