import { Esubordinate_lvl } from '../interfaces/ISalarybonus';

export class UpdateSalarybonusDto{
  name: string;
  percent_per_year: number;
  limit_on_percent_per_year: number;
  subordinate_percent_bonus?: number;
  subordinate_lvl?: Esubordinate_lvl
}
