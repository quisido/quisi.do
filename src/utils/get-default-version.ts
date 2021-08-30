import leftPad from '../utils/left-pad';

const DATE: Date = new Date();
const MONTH_OFFSET = 1;

const DAY: string = leftPad(DATE.getUTCDate());
const HOURS: string = leftPad(DATE.getUTCHours());
const MINUTES: string = leftPad(DATE.getUTCMinutes());
const MONTH: string = leftPad(DATE.getUTCMonth() + MONTH_OFFSET);
const SECONDS: string = leftPad(DATE.getSeconds());
const YEAR: number = DATE.getUTCFullYear();

export default function getDefaultVersion(): string {
  return `${YEAR}.${MONTH}${DAY}.${HOURS}${MINUTES}${SECONDS}`;
}
