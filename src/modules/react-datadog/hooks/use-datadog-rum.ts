import { datadogRum } from '@datadog/browser-rum';

/*
`useDataDogRum` does not need to be a hook, but it allows us the extensibility
  of using multiple instances of DataDogRum in the future, where each instance
  can be configured by the `DataDog` component.
*/

export default function useDataDogRum(): typeof datadogRum {
  return datadogRum;
}
