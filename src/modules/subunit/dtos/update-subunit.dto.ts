import { IPersonalEntity } from "src/modules/personal/interfaces/IPersonal";

export class UpdateSubunitDto{
  name: string;
  supervisor?: IPersonalEntity | null;
  supervisor_inn?: number;
  parent_subunit_id?: number | null;
}
