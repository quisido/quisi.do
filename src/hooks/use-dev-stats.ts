import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';
import type DevArticle from '../types/dev-article';

export default function useDevStats(): UseQueryResult<DevArticle[]> {
  return useQuery('dev', async (): Promise<DevArticle[]> => {
    const response: Response = await fetch(
      'https://dev.to/api/articles?username=charlesstover',
    );
    return response.json();
  });
}
