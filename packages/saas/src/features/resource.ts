import { type Attributes, type AttributeValue } from '@opentelemetry/api';
import {
  type RawResourceAttribute,
  type Resource as ResourceType,
} from '@opentelemetry/resources';
import {
  ATTR_TELEMETRY_SDK_LANGUAGE,
  ATTR_TELEMETRY_SDK_NAME,
  ATTR_TELEMETRY_SDK_VERSION,
} from '@opentelemetry/semantic-conventions';
import {
  ATTR_CLOUD_ACCOUNT_ID,
  ATTR_CLOUD_PLATFORM,
  ATTR_CLOUD_PROVIDER,
  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
  ATTR_HOST_NAME,
  ATTR_PROCESS_EXECUTABLE_PATH,
  ATTR_PROCESS_RUNTIME_DESCRIPTION,
  ATTR_PROCESS_RUNTIME_NAME,
  ATTR_PROCESS_RUNTIME_VERSION,
  ATTR_SERVICE_INSTANCE_ID,
} from '@opentelemetry/semantic-conventions/incubating';
import { default as vitePackageJson } from 'vite/package.json';
import { default as packageJson } from '../../package.json';
import { GITHUB_SHA } from '../constants/github-sha.js';
import getSemanticResourceNavigatorAttributes from '../utils/get-semantic-resource-navigator-attributes';
import mapPackageToSemanticResourceAttributes from '../utils/map-package-to-semantic-resource-attributes.js';
import validateString from '../utils/validate-string.js';

const { description: viteDescription, version: viteVersion } = vitePackageJson;
const {
  dependencies: packageDependencies,
  name: packageName,
  version: packageVersion,
} = packageJson;

const CLOUD_PLATFORM: string = validateString(import.meta.env.CLOUD_PLATFORM);
const CLOUD_PROVIDER: string = validateString(import.meta.env.CLOUD_PROVIDER);
const TELEMETRY_SDK_NAME = '@opentelemetry/sdk-trace-web';

const CLOUD_ACCOUNT_ID: string = validateString(
  import.meta.env.CLOUD_ACCOUNT_ID,
);

const DEPLOYMENT_ENVIRONMENT: string = validateString(
  import.meta.env.DEPLOYMENT_ENVIRONMENT,
);

export default class Resource implements ResourceType {
  #hostName: AttributeValue;
  #telemetrySdkLanguage: AttributeValue;

  public constructor(
    hostName: AttributeValue,
    telemetrySdkLanguage: AttributeValue,
  ) {
    this.#hostName = hostName;
    this.#telemetrySdkLanguage = telemetrySdkLanguage;
    this.merge = this.merge.bind(this);
  }

  public get attributes(): Attributes {
    return {
      [ATTR_CLOUD_ACCOUNT_ID]: CLOUD_ACCOUNT_ID,
      [ATTR_CLOUD_PLATFORM]: CLOUD_PLATFORM,
      [ATTR_CLOUD_PROVIDER]: CLOUD_PROVIDER,
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: DEPLOYMENT_ENVIRONMENT,
      [ATTR_HOST_NAME]: this.#hostName,
      // [ATTR_PROCESS_COMMAND]: process.argv0,
      // [ATTR_PROCESS_COMMAND_ARGS]: process.argv.join(' '),
      // [ATTR_PROCESS_EXECUTABLE_NAME]
      [ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
      [ATTR_PROCESS_RUNTIME_DESCRIPTION]: viteDescription,
      [ATTR_PROCESS_RUNTIME_NAME]: 'vite',
      [ATTR_PROCESS_RUNTIME_VERSION]: viteVersion,
      [ATTR_SERVICE_INSTANCE_ID]: GITHUB_SHA,
      [ATTR_TELEMETRY_SDK_LANGUAGE]: this.#telemetrySdkLanguage,
      [ATTR_TELEMETRY_SDK_NAME]: TELEMETRY_SDK_NAME,
      [ATTR_TELEMETRY_SDK_VERSION]: packageDependencies[TELEMETRY_SDK_NAME],
      ...getSemanticResourceNavigatorAttributes(),
      ...mapPackageToSemanticResourceAttributes({
        name: packageName,
        version: packageVersion,
      }),
    };
  }

  public merge(other: ResourceType | null): ResourceType {
    return new Resource(
      other?.attributes[ATTR_HOST_NAME] ?? this.#hostName,
      other?.attributes[ATTR_TELEMETRY_SDK_LANGUAGE] ??
        this.#telemetrySdkLanguage,
    );
  }

  public getRawAttributes(): RawResourceAttribute[] {
    return Object.entries(this.attributes);
  }
}
