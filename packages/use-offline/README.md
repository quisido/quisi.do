# `useOffline`

[![GitHub Action](https://github.com/CharlesStover/charlesstover.com/actions/workflows/use-offline.yml/badge.svg?branch=main&event=push)](https://github.com/CharlesStover/charlesstover.com/actions/workflows/use-offline.yml)
[![version](https://img.shields.io/npm/v/use-offline.svg)](https://www.npmjs.com/package/use-offline)
[![downloads](https://img.shields.io/npm/dt/use-offline.svg)](https://www.npmjs.com/package/use-offline)

Listen to network connectivity events with a React hook.

## Install

- `npm install use-offline` or
- `yarn add use-offline`

## Use

```jsx
import useOffline from 'use-offline';

export default function App() {
  const isOffline = useOffline();

  return <p>You are {isOffline ? 'offline' : 'online'}.</p>;
}
```
