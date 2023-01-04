const IGNORED_SCORE_DISPLAY_MODES = new Set([
  'informative',
  'manual',
  'notApplicable',
]);

export default function reduceAuditsToDashboard(
  audits,
  { id, scoreDisplayMode, ...audit },
) {
  if (IGNORED_SCORE_DISPLAY_MODES.has(scoreDisplayMode)) {
    return audits;
  }

  return {
    ...audits,
    [id]: {
      ...audit,
      scoreDisplayMode,
    },
  };
}
