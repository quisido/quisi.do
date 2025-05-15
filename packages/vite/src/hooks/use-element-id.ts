import { useId } from 'react';

export default function useElementId(): string {
  const id: string = useId();
  const base36: string = id.replace(/[^\w-]/gu, '_');
  return `element__${base36}`;
}
