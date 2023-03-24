export interface ISalarybonus {
  id: number;
  name: string;
  percent_per_year: number;
  limit_on_percent_per_year: number;
  subordinate_percent_bonus?: number;
  subordinate_lvl?: Esubordinate_lvl;
}

export enum Esubordinate_lvl {
  First = 'first',
  Second = 'second',
  Third = 'third',
  Fource = 'fource',
  Fifth = 'fifth',
  All = 'all',
}