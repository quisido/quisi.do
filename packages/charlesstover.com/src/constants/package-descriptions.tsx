const PACKAGE_DESCRIPTIONS: Map<string, string> = new Map([
  [
    '@charlesstover/hsl2rgb',
    'This package allows you to manage color values easily as HSL (hue, saturation, and lightness), then output them as RGB (red, green, and blue).',
  ],
  [
    '@gamingmedley/konami.js',
    'Attach event listeners for when users press ⬆, ⬆, ⬇, ⬇, ⬅, ➡, ⬅, ➡, 🅱, 🅰, Enter.',
  ],
  [
    '@glossary/build',
    'Generates a glossary application using only JSON definition files.',
  ],
  [
    '@monorepo-template/compose-next-webpack',
    'This compose function allows you to compose multiple Webpack configuration functions for better readability and maintainability of your Next configuration file.',
  ],
  [
    '@monorepo-template/coverage',
    'The coverage script will generate a combined coverage report for both the Cypress and Jest test results for a given package.',
  ],
  [
    '@monorepo-template/cypress-coverage-config-override',
    'This Webpack configuration override for `react-app-rewired` enables coverage reports for Cypress tests.',
  ],
  [
    '@monorepo-template/cypress-coverage-plugin',
    "This Cypress coverage plugin is a monkey-patch of Cypress's official code coverage plugin, adding pre-configuration of NYC and support for nyc.config.cjs.",
  ],
  [
    '@monorepo-template/cypress-nyc-config',
    'This NYC configuration offers out-of-the-box Cypress support.',
  ],
  [
    '@monorepo-template/eslint-config',
    'This collection of ESLint configurations enforces best practices for several popular use cases.',
  ],
  [
    '@monorepo-template/jest-preset',
    'This Jest preset offers all-in-one support for best monorepo practices.',
  ],
  [
    '@monorepo-template/jest-transformer',
    'This Jest transformer supports TypeScript React projects.',
  ],
  [
    '@monorepo-template/merge-coverage',
    'Merging coverage reports will generate a combined report for any number of provided test results.',
  ],
  [
    '@monorepo-template/rollup-config',
    'This Rollup configuration provides best build practices for distributable modules.',
  ],
  [
    '@monorepo-template/test',
    'The monorepo test enforces best practices for monorepos as a command line script for integration pipelines.',
  ],
  [
    '@monorepo-template/tree-logger',
    'The tree logger is a console interface for logging styled, hierarchical data.',
  ],
  [
    '@monorepo-template/tsconfig',
    'This TypeScript configuration package provides best practices and configurations for monorepos.',
  ],
  [
    '@monorepo-template/up',
    "This utility command line tool upgrades all of your project's dependencies in one fell swoop.",
  ],
  [
    '@monorepo-template/webpack-configure-next-babel',
    'This Webpack configuration offers support for custom Babel configurations in NextJS applications.',
  ],
  [
    '@monorepo-template/webpack-configure-next-yarn-berry',
    'This Webpack configuration adds support for Yarn modern (v2+) to NextJS applications.',
  ],
  [
    'absolute-timestamp',
    'The absolute timestamp component provides human-readable time formatting to Unix timestamps.',
  ],
  [
    'aws-rum-react',
    'The Amazon CloudWatch RUM React client instantiates native AWS Real User Monitoring on your React application.',
  ],
  [
    'awsui-dark-mode',
    'Ease your eyes by applying a dark mode theme to all child AWS UI components.',
  ],
  ['awsui-theme', 'Easily apply your brand’s theme to your AWS UI components.'],
  [
    'deep-proxy-polyfill',
    'Polyfills the Proxy class for deep/recursive object attributes.',
  ],
  [
    'delimiter',
    'Placing delimiters between items in an array is useful for automating and enforcing Oxford commas.',
  ],
  [
    'fetch-suspense',
    'The fetch-suspense package integrates React Suspense with the Fetch API.',
  ],
  [
    'fullstory-react',
    'Easily instantiate FullStory session monitoring for your React application.',
  ],
  [
    'lazy-i18n',
    'Support internationalization for multiple languages by asynchronously loading key-value pair translation files.',
  ],
  [
    'logs-insights-hash',
    'Given a list of log groups, generate the URL hash for CloudWatch Logs Insights.',
  ],
  [
    'mssql-query-builder',
    'Dynamically build Microsoft SQL Server queries using JavaScript.',
  ],
  [
    'number-format-react',
    'Enable language-sensitive number formatting through a React component.',
  ],
  [
    'pluralsight-score',
    'Mimic the Pluralsight Score IQ graph with a React component.',
  ],
  [
    'rainbow-gradient',
    'The rainbow-gradient package generates a gradient of colors with any saturation or lightness.',
  ],
  [
    'react-capsule',
    'Share your global React state between components without managing yet another React context.',
  ],
  [
    'react-datadog',
    'Easily instantiate DataDog real user monitoring for your React application.',
  ],
  [
    'react-innertext',
    'Dynamically converting the visible text of any JSX element or React node to a string allows the automation of stricter component values, such as HTML alt and title attributes.',
  ],
  [
    'react-mui-tooltip',
    'Create React tooltips similar to those used by Material-UI.',
  ],
  [
    'react-multi-context',
    'Mounting multiple React contexts using a record of key-value pairs decreases the identention that occurs at the root of an application with a large shared state.',
  ],
  [
    'react-quotes-carousel',
    'Display quotes in a carousel with a React component.',
  ],
  [
    'react-rainbow-text',
    'This component displays a text string that gradients in color.',
  ],
  [
    'react-router-v6-instrumentation',
    'Instrument browser tracing with React Router 6.x and Sentry.',
  ],
  [
    'react-segment-analytics',
    'Easily instantiate Segment analytics for your React application.',
  ],
  ['react-sparkline-svg', 'Render sparklines as SVGs with a React component.'],
  [
    'reactn',
    'ReactN is an extension of React with a built-in global state management API.',
  ],
  [
    'relative-timestamp',
    'The relative timestamp component provides human-readable time formatting to Unix timestamps relative to the current date, such as "1 month ago."',
  ],
  [
    'rn-webview',
    'This alternative to the React Native WebView component fixes window.postMessage on iOS devices.',
  ],
  [
    'sentry-react',
    'Easily instantiate Sentry event monitoring for your React application.',
  ],
  [
    'sparkline-svg',
    'Generating a sparkline as an SVG image allows user interfaces to dynamically chart values, even as background images.',
  ],
  [
    'use-awsui',
    'By instantiating your components’ local state with this library, you can save repetitive boilerplate surrounding state instantiation and event handlers.',
  ],
  [
    'use-awsui-router',
    'In addition to managing the AWS UI component local state, these hooks bind to React Router.',
  ],
  [
    'use-awsui-table-item-description',
    'Append a full-width row to each item in an AWS UI table.',
  ],
  [
    'use-clippy',
    'Allowing components to read from and write to the user’s clipboard produces convenient UI components, like Copy buttons, with intelligent and responsive features.',
  ],
  ['use-ctrl-key', 'Listen to Ctrl key events with React hooks.'],
  [
    'use-dimensions',
    'Coupling components to the React Native Dimensions API produces a live application that is responsive to customer behavior.',
  ],
  [
    'use-force-update',
    'Analogous to the forceUpdate method of class components, this React hook forces a function component to re-render.\nThis assists developers in deprecating their class components in favor of hooks.',
  ],
  ['use-key-down', 'Listen to key down events with React hooks.'],
  ['use-mouse-move', 'Listen to mouse move events with a React hook.'],
  [
    'use-mui',
    'By instantiating your components’ local state with this library, you can save repetitive boilerplate surrounding state instantiation and event handlers.',
  ],
  ['use-offline', 'Listen to network connectivity events with a React hook.'],
  [
    'use-page-transition',
    'Listen for page transition (visibility and persistence) events with a React hook.',
  ],
  ['use-params-memo', 'React’s `useMemo` hook with a parameterized function'],
  [
    'use-react-router',
    'This React hook reads the react-router state and re-renders on page navigation events.',
  ],
  ['use-shift-key', 'Listen to Shift key events with a React hook.'],
  [
    'use-update-effect',
    'Mimic the behavior of componentDidUpdate in function components, after the render is painted.',
  ],
  [
    'use-update-layout-effect',
    'Mimic the behavior of componentDidUpdate in function components, before the render is painted.',
  ],
  [
    'with-router',
    'This higher-order component re-renders your components when the route changes.',
  ],
]);

export default PACKAGE_DESCRIPTIONS;
