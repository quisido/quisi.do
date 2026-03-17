import process from 'node:process';

const { execPath: EXEC_PATH } = process;

export default function getScriptCommand(): readonly [
  string,
  ...(readonly string[]),
] {
  if (/bun(?:\.exe)?$/iu.test(EXEC_PATH)) {
    return ['bun'];
  }

  return ['pnpm'];
}
