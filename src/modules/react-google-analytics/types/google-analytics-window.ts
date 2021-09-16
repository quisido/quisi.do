export default interface GoogleAnalyticsWindow extends Window {
  dataLayer?: (readonly unknown[])[] | undefined;
  gtag?: (...args: readonly unknown[]) => void;
}
