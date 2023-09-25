'use client';

import { useSearchParams } from 'next/navigation.js';

export default function useSearch(): string {
  const searchParams: URLSearchParams = useSearchParams();
  return searchParams.toString();
}
