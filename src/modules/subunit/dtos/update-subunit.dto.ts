import { IPersonalEntity } from "src/modules/personal/interfaces/IPersonal";
import { IUpdateSubunitDto } from "../interfaces/IUpdateSubunitDto";

export class UpdateSubunitDto implements IUpdateSubunitDto{
  id!: number;
  name: string;
  supervisor?: IPersonalEntity | null;
  supervisor_inn?: number;
  parent_subunit_id?: number | null;
}
