import { readdirSync } from 'node:fs';
import isDirectory from './is-directory.js';
import mapDirentToName from './map-dirent-to-name.js';

export default function getWorkspaceDirectories(): readonly string[] {
  return readdirSync('./packages', { withFileTypes: true })
    .filter(isDirectory)
    .map(mapDirentToName);
}
