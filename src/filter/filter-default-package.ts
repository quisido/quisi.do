import PackagesTableItem from '../types/packages-table-item';

export default function filterDefaultPackage({
  packageName,
}: PackagesTableItem): boolean {
  return packageName !== '@';
}
