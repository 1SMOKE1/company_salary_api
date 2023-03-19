import { ICreateSubunitDto } from "../interfaces/ICreateSubunitDto";
import { TGroupLevel } from "../interfaces/ISubunit";


export class CreateSubunitDto implements ICreateSubunitDto{
  id!: number;
  name: string;
  supervisor_id?: number;
  supervisor_name?: string;
  group_id?: number;
  group_level: TGroupLevel;

  constructor(){
    this.group_level = 0;
  }
}
