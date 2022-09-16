const DAYS_OFFSET = -1;
const MINUTEs_OFFSET = 5;

export default function mapDateToDatetimeGT(date: Readonly<Date>): string {
  const dateDay: number = date.getUTCDate();
  const dateMinutes: number = date.getUTCMinutes();

  const datetime: Date = new Date(date);
  datetime.setUTCDate(dateDay + DAYS_OFFSET);
  datetime.setUTCMinutes(dateMinutes + MINUTEs_OFFSET);

  return datetime.toISOString();
}
