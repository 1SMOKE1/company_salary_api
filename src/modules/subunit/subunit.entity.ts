import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany} from "typeorm";
import { IPersonalEntity } from "../personal/interfaces/IPersonal";
import { PersonalEntity } from "../personal/personal.entity";
import { ISubunitEntity } from "./interfaces/ISubunit";

@Entity({name: 'subunits'})
export class SubunitEntity implements ISubunitEntity{

  @PrimaryGeneratedColumn({type: "integer"})
  id: number;

  @Column({type: "text", length: 100})
  name: string;

  @ManyToOne(() => PersonalEntity, (person) => person, {
    nullable: true
  })
  supervisor?: IPersonalEntity | null;

  @Column({type: "integer", nullable: true})
  parent_subunit_id?: number | null;

  @OneToMany(() => PersonalEntity, (person) => person)
  subordinates: IPersonalEntity[]

}




