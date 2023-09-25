export default function isModuleLevelDirectiveWarningMessage(
  message: string,
): boolean {
  return (
    message ===
      "Module level directives cause errors when bundled, 'use client' was ignored." ||
    /^Module level directives cause errors when bundled, "use client" in "[^"]+" was ignored.$/.test(
      message,
    )
  );
}
