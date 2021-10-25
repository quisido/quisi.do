import type Item from '../types/packages-item';

export default function filterDefaultPackage({ packageName }: Item): boolean {
  return packageName !== '@';
}
