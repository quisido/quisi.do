/* eslint-disable no-console */

import stripCommandPaths from './strip-command-paths.js';

const EMPTY = 0;
const END_OF_LINE_LENGTH = ' \\'.length;
const INDENTATION_LENGTH = '  '.length;
const MAX_LINE_LENGTH = 120;
const SPACE_LENGTH = ' '.length;

export default function logCommand(
  commandParam: string,
  ...wordsParams: readonly string[]
): void {
  const words: readonly string[] = stripCommandPaths(
    commandParam,
    ...wordsParams,
  );

  const logLineChunks: string[] = [];
  let logLineLength = EMPTY;

  for (const word of words) {
    if (logLineLength === EMPTY) {
      logLineChunks.push(word);
      logLineLength += word.length;
      continue;
    }

    if (
      logLineLength + SPACE_LENGTH + word.length + END_OF_LINE_LENGTH <=
      MAX_LINE_LENGTH
    ) {
      logLineChunks.push(' ');
      logLineChunks.push(word);
      logLineLength += SPACE_LENGTH + word.length;
      continue;
    }

    logLineChunks.push(' \\\n  ');
    logLineChunks.push(word);
    logLineLength = INDENTATION_LENGTH + word.length;
  }

  console.log(logLineChunks.join(''));
}
