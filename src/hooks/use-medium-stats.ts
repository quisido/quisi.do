import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';
import type MediumArticle from '../types/medium-article';

export default function useMediumStats(): UseQueryResult<
  Record<string, MediumArticle>
> {
  return useQuery(
    'medium',
    async (): Promise<Record<string, MediumArticle>> => {
      const response: Response = await fetch(
        'https://medium.cscdn.net/charles-stover.json',
      );
      return response.json();
    },
  );
}
