export default function parseJson(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch (_err: unknown) {
    return undefined;
  }
}
