import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

type ImportXResolver = ReturnType<typeof createTypeScriptImportResolver>;

export const TYPESCRIPT_IMPORT_RESOLVER: ImportXResolver =
  createTypeScriptImportResolver({
    "alwaysTryTypes": false,
    "bun": false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-assignment -- The `EnforceExtension` enum is not exported.
    "enforceExtension": 1,
  });
