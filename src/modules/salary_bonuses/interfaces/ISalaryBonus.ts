export interface ISalarybonus {
  id: number;
  name: string;
  percent_per_year: number;
  limit_on_percent_per_year: number;
  subordinate_percent_bonus?: number;
  subordinate_lvl?: string | null;
}

export enum Esubordinate_lvl {
  First = 'first',
  All = 'all',
}



