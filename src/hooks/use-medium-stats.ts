import { UseQueryResult, useQuery } from 'react-query';
import MediumArticle from '../types/medium-article';

export default function useMediumStats(): UseQueryResult<
  Record<string, MediumArticle>
> {
  return useQuery(
    'medium',
    async (): Promise<Record<string, MediumArticle>> => {
      const response: Response = await fetch(
        process.env.REACT_APP_MEDIUM_STATS ||
          'https://medium.cscdn.net/charles-stover.json',
      );
      return await response.json();
    },
  );
}
