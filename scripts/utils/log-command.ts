const EMPTY = 0;
const END_OF_LINE_LENGTH = ' \\'.length;
const INDENTATION_LENGTH = '  '.length;
const MAX_LINE_LENGTH = 80;
const SPACE_LENGTH = ' '.length;

export default function logCommand(...words: readonly string[]): void {
  const logLineChunks: string[] = [];
  let logLineLength = 0;

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
