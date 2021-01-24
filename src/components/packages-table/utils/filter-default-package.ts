import Item from '../types/item';

export default function filterDefaultPackage({ packageName }: Item): boolean {
  return packageName !== '@';
}
