import { Resource } from '@opentelemetry/resources';
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
  ATTR_PROCESS_COMMAND,
  ATTR_PROCESS_COMMAND_ARGS,
  ATTR_PROCESS_EXECUTABLE_PATH,
  ATTR_PROCESS_RUNTIME_DESCRIPTION,
  ATTR_PROCESS_RUNTIME_NAME,
  ATTR_PROCESS_RUNTIME_VERSION,
  ATTR_SERVICE_INSTANCE_ID,
} from '@opentelemetry/semantic-conventions/incubating';
import { default as nextPackageJson } from 'next/package.json';
import { default as packageJson } from '../../package.json';
import { GITHUB_SHA } from '../constants/github-sha.js';
import getSemanticResourceNavigatorAttributes from '../utils/get-semantic-resource-navigator-attributes';
import mapPackageToSemanticResourceAttributes from '../utils/map-package-to-semantic-resource-attributes.js';
import validateString from '../utils/validate-string.js';

const { description: nextDescription, version: nextVersion } = nextPackageJson;
const {
  dependencies: packageDependencies,
  name: packageName,
  version: packageVersion,
} = packageJson;

const ARGV: string = process.argv.join(' ');
const CLOUD_PLATFORM: string = validateString(process.env['CLOUD_PLATFORM']);
const CLOUD_PROVIDER: string = validateString(process.env['CLOUD_PROVIDER']);
const TELEMETRY_SDK_NAME = '@opentelemetry/sdk-trace-web';

const CLOUD_ACCOUNT_ID: string = validateString(
  process.env['CLOUD_ACCOUNT_ID'],
);

const DEPLOYMENT_ENVIRONMENT: string = validateString(
  process.env['DEPLOYMENT_ENVIRONMENT'],
);

export default class ResourceImpl extends Resource {
  public constructor(hostName: string, telemetrySdkLanguage: string) {
    super({
      [ATTR_CLOUD_ACCOUNT_ID]: CLOUD_ACCOUNT_ID,
      [ATTR_CLOUD_PLATFORM]: CLOUD_PLATFORM,
      [ATTR_CLOUD_PROVIDER]: CLOUD_PROVIDER,
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: DEPLOYMENT_ENVIRONMENT,
      [ATTR_HOST_NAME]: hostName,
      [ATTR_PROCESS_COMMAND]: process.argv0,
      [ATTR_PROCESS_COMMAND_ARGS]: ARGV,
      // [ATTR_PROCESS_EXECUTABLE_NAME]
      [ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
      [ATTR_PROCESS_RUNTIME_DESCRIPTION]: nextDescription,
      [ATTR_PROCESS_RUNTIME_NAME]: 'next',
      [ATTR_PROCESS_RUNTIME_VERSION]: nextVersion,
      [ATTR_SERVICE_INSTANCE_ID]: GITHUB_SHA,
      [ATTR_TELEMETRY_SDK_LANGUAGE]: telemetrySdkLanguage,
      [ATTR_TELEMETRY_SDK_NAME]: TELEMETRY_SDK_NAME,
      [ATTR_TELEMETRY_SDK_VERSION]: packageDependencies[TELEMETRY_SDK_NAME],
      ...getSemanticResourceNavigatorAttributes(),
      ...mapPackageToSemanticResourceAttributes({
        name: packageName,
        version: packageVersion,
      }),
    });
  }
}
