# Cloudflare utilities

The Cloudflare utilities module contains helper functions for Cloudflare
workers. You can validate your `env` bindings for TypeScript type-safety and
prevent missing or incorrect bindings in your environments.

## Analytics Engine datasets

```ts
import { isAnalyticsEngineDataset } from 'cloudflare-utils';

const { MY_DATASET } = env;
if (!isAnalyticsEngineDataset(MY_DATASET)) {
  throw new Error('Expected an Analytics Engine dataset.');
}
```

## D1 databases

```ts
import { isD1Database } from 'cloudflare-utils';

const { MY_DATABASE } = env;
if (!isD1Database(MY_DATABASE)) {
  throw new Error('Expected a D1 database.');
}
```

## R2 buckets

```ts
import { isR2Bucket } from 'cloudflare-utils';

const { MY_BUCKET } = env;
if (!isR2Bucket(MY_BUCKET)) {
  throw new Error('Expected an R2 bucket.');
}
```
