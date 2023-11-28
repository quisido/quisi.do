interface NavigationTransactions {
  readonly frustrated: number;
  readonly satisfied: number;
  readonly tolerated: number;
}

const HALF = 0.5;
const PERCENT = 100;

export default function createApdexScore({
  frustrated,
  satisfied,
  tolerated,
}: NavigationTransactions): number {
  const total: number = frustrated + tolerated + satisfied;
  return ((tolerated * HALF + satisfied) / total) * PERCENT;
}
