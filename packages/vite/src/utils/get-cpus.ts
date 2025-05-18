import { cpus } from 'node:os';

const BASE = 10;
const CPUS_COUNT: number = cpus().length;

export default function getCpus(): number {
  const cpus: string | undefined = import.meta.env.CPUS;
  if (typeof cpus === 'undefined') {
    return CPUS_COUNT;
  }

  return parseInt(cpus, BASE);
}
