import { useEffect } from 'react';

interface Props {
  readonly high?: number | undefined;
  readonly low?: number | undefined;
  readonly max: number;
  readonly min: number;
  readonly optimum?: number | undefined;
  readonly value: number;
}

export default function useMeter({
  high,
  low,
  max,
  min,
  optimum,
  value,
}: Props): void {
  useEffect((): void => {
    if (high === undefined || high <= max) {
      return;
    }

    throw new Error(
      `A meter's high threshold cannot be greater than its maximum value: ${high} > ${max}`,
    );
  }, [high, max]);

  useEffect((): void => {
    if (high === undefined || high >= min) {
      return;
    }

    throw new Error(
      `A meter's high threshold cannot be less than its minimum value: ${high} < ${min}`,
    );
  }, [high, min]);

  useEffect((): void => {
    if (low === undefined || low <= max) {
      return;
    }

    throw new Error(
      `A meter's low threshold cannot be greater than its maximum value: ${low} > ${max}`,
    );
  }, [low, max]);

  useEffect((): void => {
    if (low === undefined || low >= min) {
      return;
    }

    throw new Error(
      `A meter's low threshold cannot be less than its minimum value: ${low} < ${min}`,
    );
  }, [low, min]);

  useEffect((): void => {
    if (optimum === undefined || optimum <= max) {
      return;
    }

    throw new Error(
      `A meter's optimum value cannot be greater than its maximum: ${optimum} > ${max}`,
    );
  }, [max, optimum]);

  useEffect((): void => {
    if (optimum === undefined || optimum >= min) {
      return;
    }

    throw new Error(
      `A meter's optimum value cannot be less than its minimum: ${optimum} < ${min}`,
    );
  }, [min, optimum]);

  useEffect((): void => {
    if (value <= max) {
      return;
    }

    throw new Error(
      `A meter's value cannot be greater than its maximum: ${value} > ${max}`,
    );
  }, [max, value]);

  useEffect((): void => {
    if (value >= min) {
      return;
    }

    throw new Error(
      `A meter's value cannot be less than its minimum: ${value} < ${min}`,
    );
  }, [min, value]);
}
