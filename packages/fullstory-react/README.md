# FullStory for React applications

[![version](https://img.shields.io/npm/v/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![downloads](https://img.shields.io/npm/dt/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)

FullStory integration with React

## Install

- `npm install fullstory-react` or
- `yarn add fullstory-react`

## Use

```jsx
import useFullStory from 'fullstory-react';

export default function App() {
  useFullStory({
    orgId: 'my-org-id',
  });

  return <>Hello world!</>;
}
```

The `useFullStory` hooks accepts all the same properties that would be passed to
the FullStory `init` method.

To identify your user, you may optionally provide `userUid` and `userVars`, the
parameters you would pass to the FullStory `identify` method.

## Integrations

### Segment

To integrate with Segment, visit the Segment website, navigate to Catalog,
select FullStory, then add your FullStory organization ID.

### Sentry

To integrate with Sentry, visit the Sentry website, navigate to your
organization settings, to Security & Privacy, to Data Scrubbing, then add
`fullStoryUrl` to the Global Safe Fields.
