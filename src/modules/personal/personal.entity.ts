import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PhysicalFaceEntity } from '../physical_face/physical_face.entity';
import { PositionEntity } from '../position/position.entity';
import { SubunitEntity } from '../subunit/subunit.entity';
import { IPersonalEntity } from './interfaces/IPersonal';

@Entity()
export class PersonalEntity implements IPersonalEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "character varying", length: 100})
  name: string;

  @OneToOne(() => PositionEntity)
  @JoinColumn()
  position: PositionEntity;

  @OneToOne(() => SubunitEntity)
  @JoinColumn()
  subunit: SubunitEntity;

  @Column({type: "int"})
  salary: number;

  @Column({type: "character varying", length: 100})
  tab_num: string;

  @OneToOne(() => PhysicalFaceEntity)
  @JoinColumn()
  physical_face: PhysicalFaceEntity;

  @Column({type: "date"})
  begin_date: Date;
  
}
