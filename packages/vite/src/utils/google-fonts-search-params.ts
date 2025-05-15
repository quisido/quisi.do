import { sortArraysByIndex } from 'fmrs';

const ENTRY_FAMILY_INDEX = 0;
const sortEntryByFamily = sortArraysByIndex(ENTRY_FAMILY_INDEX);

const mapEntryToFamily = ([family, weights]: readonly [
  string,
  number | readonly number[],
]): string => {
  if (typeof weights === 'number') {
    return mapEntryToFamily([family, [weights]]);
  }

  const familyStr: string = family.replaceAll('_', ' ');
  const weightStr: string = weights.join(';');
  return `${familyStr}:wght@${weightStr}`;
};

export default class GoogleFontsSearchParams extends URLSearchParams {
  public constructor(
    fonts: Readonly<Record<string, number | readonly number[]>>,
  ) {
    super({ display: 'swap' });

    const entries: readonly [string, number | readonly number[]][] =
      Object.entries(fonts).sort(sortEntryByFamily);
    for (const entry of entries) {
      const family: string = mapEntryToFamily(entry);
      this.append('family', family);
    }
  }
}
