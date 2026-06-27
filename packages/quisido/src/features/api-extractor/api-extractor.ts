import { existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import {
  Extractor,
  ExtractorConfig,
  type ExtractorResult as MicrosoftExtractorResult,
} from '@microsoft/api-extractor';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import getPackageJson from '../../utils/get-package-json.js';
import requireResolve from '../../utils/require-resolve.js';

interface InvokeOptions {
  readonly configFilePath: string;
  readonly packageJsonFilePath: string;
  readonly projectFolder: string;
}

interface ApiExtractorResult {
  readonly errorCount: number;
  readonly succeeded: boolean;
  readonly warningCount: number;
}

const pluralize = (count: number, singular: string): string => {
  if (count === 1) {
    return singular;
  }
  return `${singular}s`;
};

export interface ApiExtractorDependencies {
  readonly cwd: () => string;
  readonly fileExists: (path: string) => boolean;
  readonly getPackageJson: () => Promise<Record<string, unknown>>;
  readonly invoke: (options: InvokeOptions) => ApiExtractorResult;
  readonly resolveSharedConfig: () => string;
}

const invokeApiExtractor = ({
  configFilePath,
  packageJsonFilePath,
  projectFolder,
}: InvokeOptions): MicrosoftExtractorResult => {
  const configObject = ExtractorConfig.loadFile(configFilePath);
  const extractorConfig = ExtractorConfig.prepare({
    configObject,
    configObjectFullPath: configFilePath,
    packageJsonFullPath: packageJsonFilePath,
    projectFolderLookupToken: projectFolder,
  });

  return Extractor.invoke(extractorConfig, {
    localBuild: false,
    showVerboseMessages: true,
  });
};

const DEFAULT_DEPENDENCIES: ApiExtractorDependencies = {
  cwd: (): string => process.cwd(),
  fileExists: existsSync,
  getPackageJson,
  invoke: invokeApiExtractor,
  resolveSharedConfig: (): string =>
    requireResolve('quisido/api-extractor.json'),
};

export const runApiExtractor = async (
  dependencies: ApiExtractorDependencies = DEFAULT_DEPENDENCIES,
): Promise<ReportingToolResult> => {
  const packageJson = await dependencies.getPackageJson();
  if (packageJson['private'] === true) {
    return {
      message: 'The package is private.',
      status: 'skipped',
    };
  }

  const projectFolder: string = dependencies.cwd();
  const packageConfigPath: string = join(
    projectFolder,
    'config',
    'api-extractor.json',
  );
  let configFilePath: string = dependencies.resolveSharedConfig();
  if (dependencies.fileExists(packageConfigPath)) {
    configFilePath = packageConfigPath;
  }
  const { errorCount, succeeded, warningCount } = dependencies.invoke({
    configFilePath,
    packageJsonFilePath: join(projectFolder, 'package.json'),
    projectFolder,
  });

  if (succeeded) {
    return { status: 'success' };
  }

  return {
    context:
      'API Extractor found problems with the package public API declarations.',
    message: `API Extractor completed with ${errorCount.toString()} ${pluralize(errorCount, 'error')} and ${warningCount.toString()} ${pluralize(warningCount, 'warning')}.`,
    status: 'failure',
  };
};

export const apiExtractor: ReportingTool = new ReportingTool(
  'api-extractor',
  runApiExtractor,
);
