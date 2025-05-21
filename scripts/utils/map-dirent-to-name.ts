import type { Dirent } from 'node:fs';

export default function mapDirentToName({ name }: Dirent): string {
  return name;
}
