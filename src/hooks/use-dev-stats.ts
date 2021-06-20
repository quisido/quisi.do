import { UseQueryResult, useQuery } from 'react-query';
import DevArticle from '../types/dev-article';

export default function useDevStats(): UseQueryResult<DevArticle[]> {
  return useQuery('dev', async (): Promise<DevArticle[]> => {
    const response: Response = await fetch(
      'https://dev.to/api/articles?username=charlesstover',
    );
    return await response.json();
  });
}
