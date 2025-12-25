const importUnix = (path: string): Promise<unknown> => {
  return import(path);
};

const importWin32 = (path: string): Promise<unknown> => {
  return import(`file://${path}`);
};

const platformImport: (path: string) => Promise<unknown> = (() => {
  switch (process.platform) {
    case 'win32':
      return importWin32;

    default:
      return importUnix;
  }
})();

export default platformImport;
