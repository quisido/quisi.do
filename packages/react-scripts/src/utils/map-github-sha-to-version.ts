const ALPHANUMERIC_LENGTH = 36;
const BASE = 10;
const HEXADECIMAL = 16;

const filterNumberByTrailingZeros = (n: number): boolean => {
  const str: string = n.toString();
  return str.endsWith('0') || str.includes('+');
};

// Convert from base 16 to 36, and strip arbitrary trailing zeros.
export default function mapGithubShaToVersion(sha: string): string {
  let versionNumber: number = parseInt(sha, HEXADECIMAL);
  while (filterNumberByTrailingZeros(versionNumber)) {
    versionNumber /= BASE;
  }

  return versionNumber.toString(ALPHANUMERIC_LENGTH);
}
