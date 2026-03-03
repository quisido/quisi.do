export default function handleReadReportFile(report: string): string {
  return `

## Error report

\`\`\`json
${report}
\`\`\`

`.trim();
}
