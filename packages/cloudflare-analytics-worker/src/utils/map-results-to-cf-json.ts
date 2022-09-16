/* eslint-disable @typescript-eslint/no-type-alias */
import type CfJson from '../types/cf-json';
import type DatasetDimensionValue from '../types/dataset-dimension-value';
import type DatasetValues from '../types/dataset-values';
import type Result from '../types/result';
import mapRecordToEntries from './map-record-to-entries';
import mapResultToBudget from './map-result-to-budget';

type DatasetRecord = Record<string, Datum | undefined>;

type Datum =
  | Record<string, number | undefined>
  | number
  | readonly DatasetDimensionValue[];

const EMPTY_ARRAY: readonly never[] = Object.freeze([]);
const TYPES = ['accounts' as const, 'zones' as const];

const isArray = (value: unknown): value is readonly unknown[] =>
  Array.isArray(value);

export default function mapResultsToCfJson(results: readonly Result[]): CfJson {
  const datasets: Record<string, DatasetRecord | undefined> = {};

  const mapDatasetNameToRecord = (name: string): DatasetRecord => {
    const record: DatasetRecord | undefined = datasets[name];
    if (typeof record !== 'undefined') {
      return record;
    }

    const newRecord: DatasetRecord = {};
    datasets[name] = newRecord;
    return newRecord;
  };

  for (const result of results) {
    for (const type of TYPES) {
      const [record] = result.data.viewer[type] ?? EMPTY_ARRAY;
      if (typeof record === 'undefined') {
        continue;
      }

      for (const [datasetName, [values]] of Object.entries(record)) {
        const recursiveParse = (
          value: DatasetValues | number | readonly DatasetDimensionValue[],
          keys: readonly string[] = EMPTY_ARRAY,
        ): void => {
          if (typeof value === 'number' || isArray(value)) {
            const key: string = keys.join('_');
            const datasetRecord: DatasetRecord =
              mapDatasetNameToRecord(datasetName);

            datasets[datasetName] = {
              ...datasetRecord,
              [key]: value,
            };
            return;
          }

          for (const [nestedName, nestedValue] of mapRecordToEntries(value)) {
            // Drop the `quantiles` key.
            if (nestedName === 'quantiles') {
              recursiveParse(nestedValue, keys);
              continue;
            }

            recursiveParse(nestedValue, [nestedName, ...keys]);
          }
        };

        recursiveParse(values, []);
      }
    }
  }

  const budgets: readonly number[] = results.map(mapResultToBudget);
  return {
    budget: Math.min(...budgets),
    datasets,
  };
}
