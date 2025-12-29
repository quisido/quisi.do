import { type Dirent } from 'node:fs';

export default function mapDirentToName({ name }: Readonly<Dirent>): string {
  return name;
}
