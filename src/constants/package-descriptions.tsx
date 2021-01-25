import { ReactNode } from 'react';

const NPM_PACKAGE_DESCRIPTIONS: Map<string, ReactNode> = new Map<
  string,
  ReactNode
>([
  [
    '@charlesstover/hsl2rgb',
    'This package allows you to manage color values easily as HSL (hue, saturation, and lightness), then output them as RGB (red, green, and blue).',
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
    'rainbow-gradient',
    'The rainbow-gradient package generates a gradient of colors with any saturation or lightness.',
  ],
  [
    'react-innertext',
    'Dynamically converting the visible text of any JSX element or React node to a string allows the automation of stricter component values, such as HTML alt and title attributes.',
  ],
  [
    'react-multi-context',
    'Mounting multiple React contexts using a record of key-value pairs decreases the identention that occurs at the root of an application with a large shared state.',
  ],
  [
    'react-rainbow-text',
    'This component displays a text string that gradients in color.',
  ],
  [
    'reactn',
    'ReactN is an extension of React with a built-in global state management API.',
  ],
  [
    'reactn-devtools',
    "The ReactN DevTools display an application's ReactN global state in the Redux DevTools browser extension.",
  ],
  [
    'rn-webview',
    'This alternative to the React Native WebView component fixes window.postMessage on iOS devices.',
  ],
  [
    'sparkline-svg',
    'Generating a sparkline as an SVG image allows user interfaces to dynamically chart values, even as background images.',
  ],
  [
    'use-clippy',
    "Allowing components to read from and write to the user's clipboard produces convenient UI components, like Copy buttons, with intelligent and responsive features.",
  ],
  [
    'use-dimensions',
    'Coupling components to the React Native Dimensions API produces a live application that is responsive to customer behavior.',
  ],
  [
    'use-force-update',
    [
      'Analogous to the forceUpdate method of class components, this React hook forces a function component to re-render.',
      'This assists developers in deprecating their class components in favor of hooks.',
    ],
  ],
  [
    'use-react-router',
    'This React hook reads the react-router state and re-renders on page navigation events.',
  ],
]);

export default NPM_PACKAGE_DESCRIPTIONS;
