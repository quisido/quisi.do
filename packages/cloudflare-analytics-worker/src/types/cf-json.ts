export default interface CfJson {
  readonly budget: number;
  readonly datasets: Record<string, Record<string, number>>;
}
