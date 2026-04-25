import { useId as useReactId } from 'react';

export default function useId(): string {
  const id: string = useReactId();
  const base36: string = id.replace(/[^\w-]/gu, '_');
  return `design-system__${base36}`;
}
