import { Esubordinate_lvl } from '../interfaces/ISalarybonus';

export class CreateSalarybonusDto {
  

  constructor(
    public name: string,
    public percent_per_year: number,
    public limit_on_percent_per_year: number,
    public subordinate_percent_bonus?: number,
    public subordinate_lvl?: Esubordinate_lvl
  ) {
  }
}
