import { readdirSync } from 'node:fs';
import isDirectory from '../../utils/is-directory.js';
import mapDirentToName from '../../utils/map-dirent-to-name.js';

export default function getWorkspaceDirectories(): readonly string[] {
  return readdirSync('./packages', { withFileTypes: true })
    .filter(isDirectory)
    .map(mapDirentToName);
}
