import useId from './use-id.js';
import useMainOwner from './use-main-owner.js';

export default function useMain(): string {
  const id: string = useId();

  useMainOwner(id);

  return id;
}
