import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

type ImportXResolver = ReturnType<typeof createTypeScriptImportResolver>;

export const TYPESCRIPT_IMPORT_RESOLVER: ImportXResolver =
  createTypeScriptImportResolver({
    "alwaysTryTypes": false,
    "bun": false,
    "enforceExtension": 1,
  });
