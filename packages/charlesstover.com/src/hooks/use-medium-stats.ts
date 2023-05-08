import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type MediumArticle from '../types/medium-article';

export default function useMediumStats(): UseQueryResult<
  Record<string, MediumArticle>
> {
  return useQuery(
    ['medium'],
    async (): Promise<Record<string, MediumArticle>> => {
      const response: Response = await window.fetch(
        'https://medium.cscdn.net/charles-stover.json',
      );

      return response.json();
    },
  );
}
