import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { PhysicalFaceEntity } from '../physical_face/physical_face.entity';
import { IPositionEntity } from '../position/interfaces/IPosition';
import { PositionEntity } from '../position/position.entity';
import { SubunitEntity } from '../subunit/subunit.entity';
import { IPersonalEntity } from './interfaces/IPersonal';

@Entity({name: 'personal'})
export class PersonalEntity implements IPersonalEntity{

  @PrimaryGeneratedColumn({type: "integer"})
  id!: number;

  @ManyToOne(() => PositionEntity, ({name}) => name)
  position: IPositionEntity;

  @ManyToOne(() => SubunitEntity)
  subunit: SubunitEntity;

  @Column({type: "integer", default: 500}, )
  salary: number;

  @OneToOne(() => PhysicalFaceEntity)
  @JoinColumn()
  physical_face: PhysicalFaceEntity;

  @Column({type: "text", default: new Date().toLocaleString()})
  begin_date: Date;
  
}



