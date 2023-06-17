import { useLocation } from 'react-router';

export default function usePathname(): string {
  const { pathname } = useLocation();
  return pathname;
}
