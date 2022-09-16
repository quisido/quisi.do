export default function mapSourceLocationToString({ column, line, url }) {
  return `${url} (line ${line}, column ${column})`;
}
