const NAMES_BY_OSCPU: Readonly<Record<string, string>> = {
  Mac_PowerPC: 'Mac OS',
  Macintosh: 'Mac OS',
  Win16: 'Windows 3.11',
  Win95: 'Windows NT 4.0',
  Win98: 'Windows 98',
  WinNT: 'Windows NT 4.0',
  'WinNT4.0': 'Windows NT 4.0',
  Windows_95: 'Windows 95',
  'Windows 10.0': 'Windows 10',
  'Windows NT': 'Windows NT 4.0',
  'Windows NT 10.0': 'Windows 10',
  'Windows NT 5.0': 'Windows 2000',
  'Windows NT 5.1': 'Windows XP',
  'Windows NT 5.2': 'Windows Server 2003',
  'Windows NT 6.0': 'Windows Vista',
  'Windows NT 6.1': 'Windows 7',
  'Windows NT 6.2': 'Windows 8',
  WOW64: 'Windows 8',
  X11: 'Linux',
};

export default function mapOscpuToName(
  oscpu: string | undefined,
): string | undefined {
  if (typeof oscpu === 'undefined') {
    return;
  }

  return NAMES_BY_OSCPU[oscpu] ?? oscpu;
}
