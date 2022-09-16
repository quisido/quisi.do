export default function mapNodeToString({ nodeLabel, selector, snippet }) {
  return `${nodeLabel} ${snippet} ${selector}`;
}
