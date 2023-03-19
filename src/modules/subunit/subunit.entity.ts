import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ISubunitEntity, TGroupLevel } from "./interfaces/ISubunit";

@Entity({name: 'subunits'})
export class SubunitEntity implements ISubunitEntity{

  @PrimaryGeneratedColumn({type: "integer"})
  id: number;

  @Column({type: "text", length: 100})
  name: string;

  @Column({type: "bigint", nullable: true})
  supervisor_id?: number;

  @Column({type: "text", length: 100, nullable: true})
  supervisor_name?: string;

  @Column({type: "bigint", nullable: true})
  group_id?: number;

  @Column({type: "int", default: 0, nullable: true})
  group_level: TGroupLevel;

}
