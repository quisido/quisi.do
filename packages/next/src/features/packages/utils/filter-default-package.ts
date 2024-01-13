import type Item from '../types/packages-item.js';

export default function filterDefaultPackage({
  packageName,
}: Readonly<Item>): boolean {
  return packageName !== '@';
}
