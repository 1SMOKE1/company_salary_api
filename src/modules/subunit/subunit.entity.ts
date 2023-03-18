import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ISubunitEntity, TGroupLevel } from "./interfaces/ISubunit";

@Entity()
export class SubunitEntity implements ISubunitEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "character varying", length: 100})
  name: string;

  @Column({type: "bigint"})
  supervisor_id?: number;

  @Column({type: "character varying", length: 100})
  supervisor_name?: string;

  @Column({type: "bigint"})
  group_id?: number;

  @Column({type: "int"})
  group_level: TGroupLevel;

}
