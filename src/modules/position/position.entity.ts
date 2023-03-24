import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { IPositionEntity } from './interfaces/IPosition';
import { ISalarybonus } from '../salary_bonuses/interfaces/ISalarybonus';
import { SalarybonusEntity } from '../salary_bonuses/salary-bonuses.entity';

@Entity({ name: 'positions' })
@Index(['name'], { unique: true })
export class PositionEntity implements IPositionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  supervisor_access: boolean;

  @ManyToOne(() => SalarybonusEntity)
  salary_bonus: ISalarybonus;

  @Column({ type: 'text', nullable: true })
  salary_bonus_name?: string | null;
}
