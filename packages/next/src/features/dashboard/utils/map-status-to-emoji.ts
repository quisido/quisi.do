import Status from '../constants/status.js';

export default function mapStatusToIcon(status: Status): string {
  switch (status) {
    case Status.Good:
      return '✅';
    case Status.NeedsImprovement:
      return '⚠';
    case Status.Poor:
      return '❌';
  }
}
