import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';

const { errorCount, succeeded, warningCount } = Extractor.invoke(
  ExtractorConfig.loadFileAndPrepare('./config/api-extractor.json'),
  {
    localBuild: true,
    showVerboseMessages: true,
  },
);

if (!succeeded) {
  const errorsStr: string = errorCount.toString();
  const warningsStr: string = warningCount.toString();
  throw new Error(
    `API Extractor completed with ${errorsStr} errors and ${warningsStr} warnings`,
  );
}
