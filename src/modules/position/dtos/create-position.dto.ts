import { ISalarybonus } from 'src/modules/salary_bonuses/interfaces/ISalarybonus';

export class CreatePositionDto {
  name: string;
  supervisor_access: boolean;
  salary_bonus: ISalarybonus;
  salary_bonus_name?: string;
}
