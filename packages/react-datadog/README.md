# React Datadog

[![CI/CD](https://github.com/CharlesStover/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/CharlesStover/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)
[![downloads](https://img.shields.io/npm/dt/react-datadog.svg)](https://www.npmjs.com/package/react-datadog)

`react-datadog` is a React hook for instantiating Datadog RUM in your React
application.

## Install

- `npm install react-datadog` or
- `yarn add react-datadog`

## Use

```javascript
import useDatadog from 'react-datadog';

export default function App() {
  useDatadog({
    applicationId: 'a0b1c2d3-e4f5-a6b7-c8d9-e0f1a2b3c4d5',
    clientToken: 'puba0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    service: 'my-service',
    sessionReplayRecording: true,
  });

  return <>Hello world!</>;
}
```

## Exports

### `useDatadog`

```javascript
import useDatadog from 'react-datadog';'
```

In addition to the RUM init configuration, the `useDatadog` hooks also accepts
additional props:

#### `enabled`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `useDatadog` hook will automatically
initialize on mount.

#### `sessionReplayRecording`

Type: `boolean` (default: `true`)

Unless explicitly set to `false`, the `useDatadog` hook will automatically start
session replay recording on mount (and stop session replay recording on
unmount).

### `useDatadogRum`

```javascript
import { useDatadogRum } from 'react-datadog';
```

Not to be confused with the `useDatadog` default export, the `useDatadogRum`
hook returns the Datadog RUM object. While this is currently equivalent to
`import { datadogRum } from '@datadog/browser-rum';`, this hook allows future
extensibility with React context.
