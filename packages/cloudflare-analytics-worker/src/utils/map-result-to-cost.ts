import type Result from '../types/result.js';

export default function mapResultToCost(result: Result): number {
  return result.data.cost;
}
