import type { Handler } from '@quisido/worker';

export default function handleLog(this: Handler, message: string): void {
  this.console.log(message);
}
