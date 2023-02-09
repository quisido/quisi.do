import type Result from '../types/result';

export default function mapResultToCost(result: Result): number {
  return result.data.cost;
}
