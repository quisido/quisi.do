const NOT_FOUND = -1;
const SEPARATOR_LENGTHJ = 1;
const START = 0;

export default function stripCommandPaths(
  command: string,
  ...words: readonly string[]
): readonly string[] {
  const pathLength: number = Math.max(
    command.lastIndexOf('/'),
    command.lastIndexOf('\\'),
  );

  if (pathLength === NOT_FOUND) {
    return [command, ...words];
  }

  const path: string = command.substring(START, pathLength + SEPARATOR_LENGTHJ);

  const stripPath = (word: string): string => {
    if (!word.startsWith(path)) {
      return word;
    }

    return word.substring(pathLength + SEPARATOR_LENGTHJ);
  };

  return [command, ...words].map(stripPath);
}
