import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation.js';

export default function useSearch(): string {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const search: string = searchParams.toString();
  if (search === '') {
    return '';
  }
  return `?${search}`;
}
