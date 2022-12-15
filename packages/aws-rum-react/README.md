# Amazon CloudWatch RUM React client

[![GitHub Action](https://github.com/CharlesStover/charlesstover.com/actions/workflows/aws-rum-react.yml/badge.svg?branch=main&event=push)](https://github.com/CharlesStover/charlesstover.com/actions/workflows/aws-rum-react.yml)
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
bundle using the provided CommonJS or ES modules. The recommended method to
consume and manage the React client dependency is to use the React client's NPM
package.

```sh
npm install --save aws-rum-react aws-rum-web
// or
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

## Additional documentation

- [Configuring the client](https://github.com/aws-observability/aws-rum-web/blob/main/docs/configuration.md)
- [Troubleshooting](https://github.com/aws-observability/aws-rum-web/blob/HEAD/docs/cdn_troubleshooting.md)

## Getting help

Use the following community resources for getting help with the SDK. We use the
GitHub issues for tracking bugs and feature requests.

- View the [CloudWatch RUM documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html).
- Ask a question in the [Amazon CloudWatch forum](https://forums.aws.amazon.com/forum.jspa?forumID=138).
- Open a support ticket with [AWS Support](https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html).
- If you think you may have found a bug:
  - open an issue with [`aws-rum-react`](https://github.com/CharlesStover/charlesstover.com/aws-rum-react/issues/new), or
  - open an issue with [`aws-rum-web`](https://github.com/aws-observability/aws-rum-web/issues/new).

## Opening issues

If you encounter a bug with the CloudWatch RUM web client, we want to hear about
it. Before opening a new issue,
[search the existing issues](https://github.com/aws-observability/aws-rum-web/issues?q=is%3Aissue)
to see if others are also experiencing the issue. Include the version of the
CloudWatch RUM web client, Node runtime, and other dependencies if applicable.
In addition, include the repro case when appropriate.

The GitHub issues are intended for bug reports and feature requests. For help
and questions about using the CloudWatch RUM web client, use the resources
listed in the [Getting Help](#getting-help) section. Keeping the list of open
issues lean helps us respond in a timely manner.

## Contributing

We support and accept pull requests from the community.

See
[CONTRIBUTING](https://github.com/aws-observability/aws-rum-web/blob/HEAD/CONTRIBUTING.md).
