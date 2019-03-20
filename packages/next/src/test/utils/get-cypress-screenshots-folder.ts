export default function getCypressScreenshotsFolder(): string {
  const subfolder: string | undefined =
    process.env['CYPRESS_SCREENSHOTS_SUBFOLDER'];

  if (typeof subfolder === 'undefined') {
    return 'cypress/screenshots';
  }

  return `cypress/screenshots/${subfolder}`;
}
