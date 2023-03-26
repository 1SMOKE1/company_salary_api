import { ISalarybonus } from '../../salary_bonuses/interfaces/ISalarybonus';

export interface IPositionEntity {
  id: number;
  name: string;
  supervisor_access: boolean;
  salary_bonus: ISalarybonus;
  salary_bonus_name?: string | null;
}
