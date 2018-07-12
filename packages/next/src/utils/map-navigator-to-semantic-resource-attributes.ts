import {
  SEMRESATTRS_OS_DESCRIPTION,
  SEMRESATTRS_OS_NAME,
  SEMRESATTRS_OS_TYPE,
  SEMRESATTRS_WEBENGINE_DESCRIPTION,
  SEMRESATTRS_WEBENGINE_NAME,
  SEMRESATTRS_WEBENGINE_VERSION,
} from '@opentelemetry/semantic-conventions';
import mapOscpuToName from './map-oscpu-to-name.js';
import mapOscpuToType from './map-oscpu-to-type.js';
import validateString from './validate-string.js';

export type SemanticResourceNavigatorAttributes = Record<
  typeof SEMRESATTRS_WEBENGINE_DESCRIPTION,
  string
> &
  Partial<
    Record<
      | typeof SEMRESATTRS_OS_DESCRIPTION
      | typeof SEMRESATTRS_OS_NAME
      | typeof SEMRESATTRS_OS_TYPE
      | typeof SEMRESATTRS_WEBENGINE_NAME
      | typeof SEMRESATTRS_WEBENGINE_VERSION,
      string | undefined
    >
  >;

export default function mapNavigatorToSemanticResourceAttributes(
  navigator: Navigator,
): SemanticResourceNavigatorAttributes {
  const { productSub, userAgent, vendor } = navigator;

  const getOscpu = (): string | undefined => {
    if (!('oscpu' in navigator)) {
      return;
    }
    try {
      return validateString(navigator.oscpu);
    } catch (err: unknown) {
      return;
    }
  };

  const oscpu: string | undefined = getOscpu();
  return {
    [SEMRESATTRS_OS_DESCRIPTION]: oscpu,
    [SEMRESATTRS_OS_NAME]: mapOscpuToName(oscpu),
    [SEMRESATTRS_OS_TYPE]: mapOscpuToType(oscpu),
    [SEMRESATTRS_WEBENGINE_DESCRIPTION]: userAgent,
    [SEMRESATTRS_WEBENGINE_NAME]: vendor,
    [SEMRESATTRS_WEBENGINE_VERSION]: productSub,
  };
}
