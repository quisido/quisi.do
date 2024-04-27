import {
  OSTYPEVALUES_LINUX,
  OSTYPEVALUES_WINDOWS,
} from '@opentelemetry/semantic-conventions';

export default function mapOscpuToType(
  oscpu: string | undefined,
): string | undefined {
  if (typeof oscpu === 'undefined') {
    return;
  }

  // Windows
  if (oscpu.startsWith('Win')) {
    return OSTYPEVALUES_WINDOWS;
  }

  switch (oscpu) {
    case 'Mac_PowerPC':
    case 'Macintosh':
    case 'X11':
      return OSTYPEVALUES_LINUX;

    case 'WOW64':
      return OSTYPEVALUES_WINDOWS;

    default:
      return oscpu.toLowerCase();
  }
}
