import { IPersonalEntity } from "src/modules/personal/interfaces/IPersonal";

export class CreateSubunitDto{
  name: string;
  supervisor?: IPersonalEntity| null;
  supervisor_inn?: number | null;
  parent_subunit_id?: number | null;
}
