export default function mapOscpuToName(
  oscpu: string | undefined,
): string | undefined {
  if (typeof oscpu === 'undefined') {
    return;
  }

  switch (oscpu) {
    case 'Mac_PowerPC':
    case 'Macintosh':
      return 'Mac OS';

    case 'Win16':
      return 'Windows 3.11';

    case 'Win95':
    case 'WinNT':
    case 'WinNT4.0':
    case 'Windows NT':
      return 'Windows NT 4.0';

    case 'Windows_95':
      return 'Windows 95';

    case 'Win98':
      return 'Windows 98';

    case 'Windows 10.0':
    case 'Windows NT 10.0':
      return 'Windows 10';

    case 'Windows NT 5.0':
      return 'Windows 2000';

    case 'Windows NT 5.1':
      return 'Windows XP';

    case 'Windows NT 5.2':
      return 'Windows Server 2003';

    case 'Windows NT 6.0':
      return 'Windows Vista';

    case 'Windows NT 6.1':
      return 'Windows 7';

    case 'Windows NT 6.2':
    case 'WOW64':
      return 'Windows 8';

    case 'X11':
      return 'Linux';
  }

  return oscpu;
}
