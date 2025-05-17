const navigate = (route: string, method: 'push' | 'replace' = 'push'): void => {
  switch (method) {
    case 'push':
      window.history.pushState(null, '', route);
      break;

    case 'replace':
      window.history.replaceState(null, '', route);
      break;
  }
};

export default function useNavigation(): (
  route: string,
  method?: 'push' | 'replace',
) => void {
  return navigate;
}
