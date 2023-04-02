import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Esubordinate_lvl, ISalarybonus } from './interfaces/ISalaryBonus';

@Entity('salary_bonuses')
export class SalarybonusEntity implements ISalarybonus {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'real' })
  percent_per_year: number;

  @Column({ type: 'real' })
  limit_on_percent_per_year: number;

  @Column({ type: 'real', nullable: true })
  subordinate_percent_bonus?: number;

  @Column({ type: 'text', nullable: true })
  subordinate_lvl?: Esubordinate_lvl | null;
}
