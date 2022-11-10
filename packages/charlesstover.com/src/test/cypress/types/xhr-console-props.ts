export default interface XhrConsoleProps {
  readonly Method: string;
  readonly 'Request went to origin?': 'yes' | 'no';
  readonly 'Request Headers': Record<string, string | undefined>;
  readonly 'Resource Type': 'xhr';
  readonly 'Response Headers': Record<string, string | undefined>;
  readonly 'Response Status Code': number;
  readonly URL: string;
}
