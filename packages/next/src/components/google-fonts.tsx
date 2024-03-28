import { sortArraysByIndex } from 'map-reduce-sort';
import { type ReactElement } from 'react';

const ENTRY_FAMILY_INDEX = 0;

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

const sortEntryByFamily = sortArraysByIndex(ENTRY_FAMILY_INDEX);

export default function GoogleFonts(
  props: Record<string, number | readonly number[]>,
): ReactElement {
  const params: URLSearchParams = new URLSearchParams();
  params.set('display', 'swap');

  for (const entry of Object.entries(props).sort(sortEntryByFamily)) {
    const family: string = mapEntryToFamily(entry);
    params.append('family', family);
  }

  return (
    <link
      href={`https://fonts.googleapis.com/css2?${params.toString()}`}
      rel="stylesheet"
    />
  );
}
