import { IPersonalEntity } from "src/modules/personal/interfaces/IPersonal";
import { ICreateSubunitDto } from "../interfaces/ICreateSubunitDto";




export class CreateSubunitDto implements ICreateSubunitDto{
  id!: number;
  name: string;
  supervisor?: IPersonalEntity| null;
  supervisor_inn?: number;
  parent_subunit_id?: number | null;
}
