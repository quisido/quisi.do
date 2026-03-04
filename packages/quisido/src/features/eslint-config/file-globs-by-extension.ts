const mapExtensionToGlobs = (extension: string): string[] => [
  // Dot directory, dot file
  `**/.*/**/.*.${extension}`,

  // Dot directory, non-dot file
  `**/.*/**/*.${extension}`,

  // Dot file
  `**/.*.${extension}`,

  // Non-dot file
  `**/*.${extension}`,
];

export default function fileGlobsByExtension(
  ...extensions: readonly string[]
): string[] {
  return extensions.flatMap(mapExtensionToGlobs);
}
