export default function debug(message: string): void {
  globalThis.console.debug(`[quisi] ${message}`);
}
