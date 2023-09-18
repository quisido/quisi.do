import { useSearchParams } from 'next/navigation';

export default function useSearch(): string {
  const searchParams: URLSearchParams = useSearchParams();
  return searchParams.toString();
}
