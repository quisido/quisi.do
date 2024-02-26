# `<Sentry />`

[![version](https://img.shields.io/npm/v/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)
[![downloads](https://img.shields.io/npm/dt/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)

`sentry-react` offers a `<Sentry />` component that instantiates Sentry for your
React application.

## Install

- `npm install sentry-react` or
- `yarn add sentry-react`

## Use

Mount `<Sentry />` around your React application, typically alongside your
context providers.

```javascript
import { render } from 'react-dom';
import Sentry from 'sentry-react';
import { App } from './components';

render(
  <Sentry>
    <App />
  </Sentry>,
  document.getElementById('root'),
);
```

## Exports

In addition to the default `<Sentry />` component export, you can also import:

- `<MockSentrySdk />` to mock the Sentry SDK during unit tests.
- `useSentrySdk()` to get the Sentry SDK.
  - e.g. `const { captureError } = useSentrySdk();`

## Props

The `Sentry` component shares all the same properties as Sentry's `init`
function. Additionally, you can use the following props:

### `ErrorBoundaryFallback`

Type: `FunctionComponent<FallbackRenderParams>` _optional_

The `ErrorBoundaryFallback` component will be mounted as a replacement to your
`children` prop when and if an error is thrown.

### `beforeErrorBoundaryCapture`

Type:
`(scope: Scope, error: Error | null, componentStack: string | null) => void`
_optional_

This callback fires before the error is captured by Sentry, allowing you to add
tags or context using the scope.

### `errorBoundaryDialogOptions`

Type: `ReportDialogOptions` _optional_

The error boundary dialog options are passed into the Sentry report dialog.
These options are ignored if `showErrorBoundaryDialog` is `false`.

For the definition of `ReportDialogOptions`, see
[`@sentry/browser`'s `helpers.ts` file](https://github.com/getsentry/sentry-javascript/blob/1b8bfeb8571ec6b22f14fcfd1f4444a55092075d/packages/browser/src/helpers.ts#L167).

### `onErrorBoundaryError`

Type: `(error: Error, componentStack: string, eventId: string) => void`
_optional_

This callback fires when the error boundary encounters an error.

### `onErrorBoundaryMount`

Type: `VoidFunction` _optional_

This callback fires when the error boundary mounts.

### `onErrorBoundaryReset`

Type _(optional)_:

```ts
(
  error: Error | null,
  componentStack: string | null,
  eventId: string | null
) => void
```

This callback fires if and when the `resetError` prop is called from the
[`ErrorBoundaryFallback` component](#errorboundaryfallback).

### `onErrorBoundaryUnmount`

Type _(optional)_:

```ts
(
  error: Error | null,
  componentStack: string | null,
  eventId: string | null
) => void`
```


This callback fires when the error boundary unmounts.

### `showErrorBoundaryDialog`

Type: `boolean` _optional_

The `showErrorBoundaryDialog` prop determines if a Sentry report dialog should
be rendered on error.

### `user`

Type: `User` _optional_

By default, the user will have their IP address automatically assigned by
Sentry. While you can associate any key-value pairs to the `user` prop, Sentry
recommends `id`, `email`, `ip_address`, and `username`.

## Integrations

### FullStory

To integrate Sentry with FullStory, go to the Sentry website, under organization
settings, Security & Privacy, Data Scrubbing, and add `fullStoryUrl` to "Global
Safe Fields."
