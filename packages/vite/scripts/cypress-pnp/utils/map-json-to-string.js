const SPACES = 2;

export default function mapJsonToString(json) {
  return JSON.stringify(json, null, SPACES);
}
