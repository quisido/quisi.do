export default function handleNotFound(str: string): void {
  throw new Error(`Fallback translation not found: ${str}`);
}
