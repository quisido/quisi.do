import { useQuery } from 'react-query';

interface State {
  data?: Record<string, number[]>;
  error: unknown;
  isLoading: boolean;
  refetch(): void;
}

export default function useNpmDownloads(): State {
  const { data, error, isLoading, refetch } = useQuery(
    'npm',
    async (): Promise<Record<string, number[]>> => {
      const response: Response = await fetch(
        process.env.REACT_APP_NPM_DOWNLOADS ||
          'https://npm.cscdn.net/charlesstover.json',
      );
      return await response.json();
    },
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}
