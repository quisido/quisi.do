import type Item from './packages.type.item';

export default function filterDefaultPackage({ packageName }: Item): boolean {
  return packageName !== '@';
}
