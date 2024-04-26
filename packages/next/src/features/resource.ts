import { Resource } from '@opentelemetry/resources';
import {
  SEMRESATTRS_CLOUD_ACCOUNT_ID,
  SEMRESATTRS_CLOUD_PLATFORM,
  SEMRESATTRS_CLOUD_PROVIDER,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
  SEMRESATTRS_HOST_NAME,
  SEMRESATTRS_PROCESS_COMMAND,
  SEMRESATTRS_PROCESS_COMMAND_ARGS,
  SEMRESATTRS_PROCESS_EXECUTABLE_PATH,
  SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION,
  SEMRESATTRS_PROCESS_RUNTIME_NAME,
  SEMRESATTRS_PROCESS_RUNTIME_VERSION,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_TELEMETRY_SDK_LANGUAGE,
  SEMRESATTRS_TELEMETRY_SDK_NAME,
  SEMRESATTRS_TELEMETRY_SDK_VERSION,
} from '@opentelemetry/semantic-conventions';
import { default as nextPackageJson } from 'next/package.json';
import { default as packageJson } from '../../package.json';
import GITHUB_SHA from '../constants/github-sha.js';
import getSemanticResourceNavigatorAttributes from '../utils/get-semantic-resource-navigator-attributes';
import getTelemetrySdkLanguage from '../utils/get-telemetry-sdk-language.js';
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
  public constructor(hostname: string) {
    super({
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: DEPLOYMENT_ENVIRONMENT,
      [SEMRESATTRS_CLOUD_ACCOUNT_ID]: CLOUD_ACCOUNT_ID,
      [SEMRESATTRS_CLOUD_PLATFORM]: CLOUD_PLATFORM,
      [SEMRESATTRS_CLOUD_PROVIDER]: CLOUD_PROVIDER,
      [SEMRESATTRS_HOST_NAME]: hostname,
      [SEMRESATTRS_PROCESS_COMMAND]: process.argv0,
      [SEMRESATTRS_PROCESS_COMMAND_ARGS]: ARGV,
      // [SEMRESATTRS_PROCESS_EXECUTABLE_NAME]:
      [SEMRESATTRS_PROCESS_EXECUTABLE_PATH]: process.execPath,
      [SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION]: nextDescription,
      [SEMRESATTRS_PROCESS_RUNTIME_NAME]: 'next',
      [SEMRESATTRS_PROCESS_RUNTIME_VERSION]: nextVersion,
      [SEMRESATTRS_SERVICE_INSTANCE_ID]: GITHUB_SHA,
      [SEMRESATTRS_TELEMETRY_SDK_LANGUAGE]: getTelemetrySdkLanguage(),
      [SEMRESATTRS_TELEMETRY_SDK_NAME]: TELEMETRY_SDK_NAME,
      [SEMRESATTRS_TELEMETRY_SDK_VERSION]:
        packageDependencies[TELEMETRY_SDK_NAME],
      ...getSemanticResourceNavigatorAttributes(),
      ...mapPackageToSemanticResourceAttributes({
        name: packageName,
        version: packageVersion,
      }),
    });
  }
}
