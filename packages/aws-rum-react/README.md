# Amazon CloudWatch RUM React client

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/aws-rum-react.svg)](https://www.npmjs.com/package/aws-rum-react)
[![downloads](https://img.shields.io/npm/dt/aws-rum-react.svg)](https://www.npmjs.com/package/aws-rum-react)

This is the CloudWatch RUM React client source code repository. It hosts a React
library which performs real user monitoring (RUM) telemetry on web applications.
Data collected by the RUM React client includes page load timing, JavaScript
errors, and HTTP requests.

`aws-rum-react` is an open source, community-driven package for
[`aws-rum-web`](https://www.npmjs.com/package/aws-rum-web). It is neither
created nor vended by Amazon or Amazon CloudWatch.

## Install

The CloudWatch RUM React client can be built into the application's JavaScript
bundle using the provided CommonJS or ECMAScript modules. The recommended method
to consume and manage the React client dependency is to use the React client's
Node module.

```sh
npm install --save aws-rum-react aws-rum-web
# or
yarn add aws-rum-react aws-rum-web
```

## Instrument the application

The following code shows an example of how to instrument an application. This
component should wrap as much of the application as possible.

```tsx
import { AwsRumProvider } from 'aws-rum-react';
import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';

ROOT.render(
  <StrictMode>
    <AwsRumProvider
      allowCookies
      endpoint="https://dataplane.rum.us-west-2.amazonaws.com"
      guestRoleArn="arn:aws:iam::000000000000:role/RUM-Monitor-us-west-2-000000000000-00xx-Unauth"
      id="00000000-0000-0000-0000-000000000000"
      identityPoolId="us-west-2:00000000-0000-0000-0000-000000000000"
      region="us-west-2"
      sessionSampleRate={1}
      telemetries={['errors', 'performance']}
      version="1.0.0"
    >
      <App />
    </AwsRumProvider>
  </StrictMode>,
);
```

Modify the `AwsRumProvider` component props to match your AppMonitor. See
[Props](#props) for details.

### Props

| Prop name | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| `id`      | string | a globally unique ID for the AppMonitor |
| `region`  | string | the AWS region of the AppMonitor        |
| `version` | string | the application's semantic version      |

You may pass any application-specific React client configuration as additional
props which are all optional. While these fields are optional, depending on your
application, the React client may not function properly if certain fields are
omitted. For example, `guestRoleArn` and `identityPoolId` are both required
unless your application performs its own AWS authentication and passes the
credentials to the web client using the command `setAwsCredentials(...)`.

To get started, we recommend the props in the above sample. The `guestRoleArn`
and `identityPoolId` shown are dummy values. Modify these to match the resources
created when setting up the AppMonitor:

For a complete list of configuration options, see
[Application-specific Configurations](https://github.com/aws-observability/aws-rum-web/blob/main/docs/configuration.md).

## Hooks

You can use hooks to interact with the RUM client directly.

### `useAwsRum`

You may access the Amazon CloudWatch RUM client directly, though it's not
recommended. This hook is provided to unblock you in edge cases where custom
functionality is desired.

```javascript
import { useAwsRum } from 'aws-rum-react';

function MyComponent() {
  // Access the client directly (not recommended).
  const client = useAwsRum();

  const handleDisable = useCallback(() => {
    client.disable();
  }, [client]);

  const handleEnable = useCallback(() => {
    client.enable();
  }, [client]);

  // ...
}
```

### `useRecordError`

You may access the `recordError` method via the `useRecordError` hook.

```javascript
import { useRecordError } from 'aws-rum-react';

function MyComponent() {
  // Record an error.
  const recordError = useRecordError();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      recordError(error);
    }
  }, [error, recordError]);

  // ...
}
```

### `useRecordEvent`

You may access the `recordEvent` method via the `useRecordEvent` hook.

```javascript
import { useRecordEvent } from 'aws-rum-react';

function MyComponent({ onSubmit }) {
  // Record an event.
  const recordEvent = useRecordEvent();

  const [state, setState] = useState({});

  const handleSubmit = useCallback(() => {
    onSubmit(state);
    recordEvent('MySubmitEvent', state);
  }, [recordEvent]);

  // ...
}
```

### `useRecordPageView`

You may access the `recordPageView` API via the `useRecordPageView` hook.

```javascript
import { useRecordPageView } from 'aws-rum-react';

function MyComponent() {
  // Record a page view.
  const recordPageView = useRecordPageView();

  const pageAttributes = usePageAttributes();

  useEffect(() => {
    recordPageView(pageAttributes);
  }, [pageAttributes, recordPageView]);

  // ...
}
```

## Higher order components

You may use the `withAwsRum` HOC and `withRecordError` HOC to access the AWS RUM
instance and the `recordError` utility function respectively.

This is particularly useful for mounting your Error Boundaries.

```typescript
import { withRecordError } from 'aws-rum-react';
import { PureComponent } from 'react';

interface Props {
  readonly recordError: (error: unknown) => void;
}

class ErrorBoundary extends PureComponent<Props> {
  public componentDidCatch(err: Error): void {
    this.props.recordError(err);
  }
}

export default withRecordError(ErrorBoundary);
```

### Unit tests

When writing unit tests, a real client cannot be instantiated. You may use the
utility provider as demonstrated below.

```tsx
// MyComponent.ts
import { useRecordError } from 'aws-rum-react';
import { useEffect } from 'react';

function MyComponent(): null {
  const recordError = useRecordError();

  useEffect((): void => {
    recordError('Hello world!');
  }, [recordError]);

  return null;
}
```

```tsx
// MyComponent.test.ts
import { render } from '@testing-library/react';
import { MockAwsRumProvider } from 'aws-rum-react';
import type { PropsWithChildren, ReactElement } from 'react';
import { vi } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', (): void => {
  it('should record an error', (): void => {
    const TEST_RECORD_ERROR = vi.fn();

    render(<MyComponent />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <MockAwsRumProvider recordError={TEST_RECORD_ERROR}>
            {children}
          </MockAwsRumProvider>
        );
      },
    });

    expect(TEST_RECORD_ERROR).toHaveBeenCalledTimes(1);
    expect(TEST_RECORD_ERROR).toHaveBeenLastCalledWith('Hello world!');
  });
});
```

## Additional documentation

- [Configuring the client](https://github.com/aws-observability/aws-rum-web/blob/main/docs/configuration.md)
- [Troubleshooting](https://github.com/aws-observability/aws-rum-web/blob/HEAD/docs/cdn_troubleshooting.md)

## Getting help

Use the following community resources for getting help with the SDK. We use the
GitHub issues for tracking bugs and feature requests.

- View the
  [CloudWatch RUM documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html).
- Ask a question in the
  [Amazon CloudWatch forum](https://forums.aws.amazon.com/forum.jspa?forumID=138).
- Open a support ticket with
  [AWS Support](https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html).
- If you think you may have found a bug:
  - open an issue with
    [`aws-rum-react`](https://github.com/quisido/quisi.do/issues/new),
    or
  - open an issue with
    [`aws-rum-web`](https://github.com/aws-observability/aws-rum-web/issues/new).

## Contributing

We support and accept pull requests from the community.

See
[CONTRIBUTING](https://github.com/aws-observability/aws-rum-web/blob/HEAD/CONTRIBUTING.md).
