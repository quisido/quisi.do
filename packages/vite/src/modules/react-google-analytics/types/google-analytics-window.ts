export default interface GoogleAnalyticsWindow extends Window {
  dataLayer?: IArguments[] | undefined;
  gtag?: (...args: readonly unknown[]) => void;
}
