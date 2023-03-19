import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { EGender, IPhysicalFaceEntity } from './interfaces/IPhysicalFace';

@Entity({name: 'physical_faces'})
@Index(["inn"], {unique: true})
export class PhysicalFaceEntity implements IPhysicalFaceEntity{
  
  @PrimaryGeneratedColumn({type: "integer"})
  public id!: number;

  @Column({type: "text", length: 100})
  public name: string;

  @Column()
  public inn: number;

  @Column()
  public birthday: string;

  @Column({type: "text", length: 500})
  public education?: string;

  @Column({type: "text", length: 100})
  public gender: EGender;
}
