import mapAutoFillSetToString from './map-autofill-set-to-string.js';

export default function mapAutoCompleteToString(
  autoComplete: Set<AutoFill> | false,
): string {
  if (autoComplete === false) {
    return 'off';
  }

  return mapAutoFillSetToString(autoComplete);
}
