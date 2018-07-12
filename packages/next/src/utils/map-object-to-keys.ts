export default function mapObjectToKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as unknown as (keyof T)[];
}
