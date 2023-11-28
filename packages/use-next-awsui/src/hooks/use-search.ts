'use client';

import { useSearchParams } from 'next/navigation.js';

export default function useSearch(): string {
  const searchParams: URLSearchParams = useSearchParams();
  const search: string = searchParams.toString();

  if (search === '') {
    return '';
  }
  return `?${search}`;
}
