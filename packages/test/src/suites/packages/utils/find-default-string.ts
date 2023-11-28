export default function findDefaultString(value: unknown): value is 'default' {
  return value === 'default';
}
