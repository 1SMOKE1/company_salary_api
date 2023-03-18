import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IPositionEntity } from "./interfaces/IPosition";

@Entity()
export class PositionEntity implements IPositionEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  supervisor_access: boolean;
  
}
