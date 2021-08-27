import leftPad from '../utils/left-pad';

const DATE: Date = new Date();
const MONTH_OFFSET = 1;

const DAY: string = leftPad(DATE.getDay());
const HOURS: string = leftPad(DATE.getHours());
const MINUTES: string = leftPad(DATE.getMinutes());
const MONTH: string = leftPad(DATE.getMonth() + MONTH_OFFSET);
const YEAR: number = DATE.getFullYear();

export default function getDefaultVersion(): string {
  return `${YEAR}.${MONTH}${DAY}.${HOURS}${MINUTES}`;
}
