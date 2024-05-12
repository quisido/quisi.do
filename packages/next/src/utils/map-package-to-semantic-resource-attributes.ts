import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import split from './split.js';

interface Package {
  readonly name: string;
  readonly version: string;
}

const reverse = <T extends readonly unknown[]>(arr: T): T =>
  [...arr].reverse() as unknown as T;

export default function mapPackageToSemanticResourceAttributes({
  name,
  version,
}: Package): Record<
  typeof SEMRESATTRS_SERVICE_NAME | typeof SEMRESATTRS_SERVICE_VERSION,
  string
> &
  Partial<Record<typeof SEMRESATTRS_SERVICE_NAMESPACE, string | undefined>> {
  const [serviceName, serviceNamespace] = reverse(split(name, '/'));
  return {
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_SERVICE_NAMESPACE]: serviceNamespace,
    [SEMRESATTRS_SERVICE_VERSION]: version,
  };
}
