import type Item from '../types/packages-item';

export default function filterDefaultPackage({
  packageName,
}: Readonly<Item>): boolean {
  return packageName !== '@';
}
