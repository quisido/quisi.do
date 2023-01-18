# React Datadog

[![version](https://img.shields.io/npm/v/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![downloads](https://img.shields.io/npm/dt/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)

`react-datadog` is a collection of React utility components and hooks for
instantiating Datadog RUM in your React application.

## Install

- `npm install react-datadog` or
- `yarn add react-datadog`

## Use

```javascript
import Datadog from 'react-datadog';
import { render } from 'react-dom';
import { App } from './components';

render(
  <Datadog
    applicationId="a0b1c2d3-e4f5-a6b7-c8d9-e0f1a2b3c4d5"
    clientToken="puba0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5"
    service="my-service"
    sessionReplayRecording
  >
    <App />
  </Datadog>,
  document.getElementById('root'),
);
```

## Exports

### `<Datadog />`

```javascript
import Datadog from 'react-datadog';'
```

In addition to the RUM init configuration, the `<Datadog />` component also
accepts additional props:

#### `enabled`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `<Datadog />` component will automatically
initialize on mount.

#### `sessionReplayRecording`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `<Datadog />` component will automatically
start session replay recording on mount (and stop session replay recording on
unmount).

### `useDatadogRum`

```javascript
import { useDatadogRum } from 'react-datadog';
```

The `useDatadogRum` hook returns the Datadog RUM object. While this is currently
equivalent to `import { datadogRum } from '@datadog/browser-rum';`, this hook
allows future extensibility with integrating with your `<Datadog />` component's
prop configuration.

### Privacy levels

```javascript
import {
  DatadogAllow,
  DatadogHidden,
  DatadogMask,
  DatadogMaskUserInput,
} from 'react-datadog';
```

You may import the utility components `DatadogAllow`, `DatadogHidden`,
`DatadogMask`, and `DatadogMaskUserInput` to mask or unmask user data. These
utility components simply render HTML `<span />`s around their contents.
