const EMPTY = 0;
const MAX_LINE_LENGTH = 80;
const NEW_LINE_LENGTH = 2;
const SPACE_LENGTH = 1;

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
      logLineLength + word.length + SPACE_LENGTH + NEW_LINE_LENGTH <=
      MAX_LINE_LENGTH
    ) {
      logLineChunks.push(' ');
      logLineChunks.push(word);
      logLineLength += word.length + SPACE_LENGTH;
      continue;
    }

    logLineChunks.push(' \\\n    ');
    logLineChunks.push(word);
    logLineLength = word.length;
  }

  console.log(logLineChunks.join(''));
}
