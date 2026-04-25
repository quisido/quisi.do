import useContentInfoOwner from './use-content-info-owner.js';
import useId from './use-id.js';

export default function useContentInfo(): string {
  const id: string = useId();

  useContentInfoOwner(id);

  return id;
}
