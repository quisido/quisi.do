import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';

type ReadonlyAwsuiColllectionPreferencesEvent<T> = Readonly<
  NonCancelableCustomEvent<Readonly<CollectionPreferencesProps.Preferences<T>>>
>;

export type { ReadonlyAwsuiColllectionPreferencesEvent as default };
