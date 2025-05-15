export default function useSearch(): string {
  const { search } = window.location;
  if (search === '') {
    return '';
  }

  return `?${search}`;
}
