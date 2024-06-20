export enum GroupByInterval {
  Week = 'week',
  Day = 'day',
  Month = 'month',
}

export type DateRange = { startDate: Date; endDate: Date; key: string };
