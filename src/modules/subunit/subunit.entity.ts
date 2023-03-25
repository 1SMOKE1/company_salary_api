import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { IPersonalEntity } from "../personal/interfaces/IPersonal";
import { PersonalEntity } from "../personal/personal.entity";
import { ISubunitEntity } from "./interfaces/ISubunit";

@Entity({name: 'subunits'})
export class SubunitEntity implements ISubunitEntity{

  @PrimaryGeneratedColumn({type: "integer"})
  id: number;

  @Column({type: "text", length: 100})
  name: string;

  @ManyToOne(() => PersonalEntity, (person) => person.id, {
    nullable: true
  })
  supervisor?: IPersonalEntity | null;

  @Column({type: "integer", nullable: true})
  parent_subunit_id?: number | null;


}




