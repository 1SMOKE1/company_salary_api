import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IPositionEntity } from "./interfaces/IPosition";

@Entity({name: 'positions'})
export class PositionEntity implements IPositionEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({type: "int"})
  supervisor_access: boolean;
  
}
