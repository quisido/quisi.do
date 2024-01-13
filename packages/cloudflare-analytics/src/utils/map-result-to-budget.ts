import type Result from '../types/result.js';

export default function mapResultToBudget(result: Result): number {
  return result.data.viewer.budget;
}
