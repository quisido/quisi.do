import type CfJson from '../types/cf-json';
import type Datasets from '../types/datasets';
import type Result from '../types/result';
import mapResultToBudget from './map-result-to-budget';

const FIRST = 0;

export default function mapResultsToCfJson(results: readonly Result[]): CfJson {
  const body: Record<string, Record<string, number>> = {};

  const appendData = (
    datasetName: string,
    valueName: string,
    value: number,
  ): void => {
    const dataset: Record<string, number> | undefined = body[datasetName];
    if (typeof dataset === 'undefined') {
      body[datasetName] = {
        [valueName]: value,
      };
      return;
    }

    body[datasetName] = {
      ...dataset,
      [valueName]: value,
    };
  };

  for (const result of results) {
    const datasets: Datasets = result.data.viewer.accounts[FIRST];
    for (const [name, [values]] of Object.entries(datasets)) {
      for (const [valueName, value] of Object.entries(values)) {
        if (typeof value === 'number') {
          appendData(name, valueName, value);
        } else {
          for (const [nestedValueName, nestedValue] of Object.entries(value)) {
            if (valueName === 'quantiles') {
              appendData(name, nestedValueName, nestedValue);
            } else {
              appendData(name, `${nestedValueName}.${valueName}`, nestedValue);
            }
          }
        }
      }
    }
  }

  const budgets: readonly number[] = results.map(mapResultToBudget);
  return {
    budget: Math.min(...budgets),
    datasets: body,
  };
}
