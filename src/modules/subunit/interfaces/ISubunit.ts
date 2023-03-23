import { IPersonalEntity } from "src/modules/personal/interfaces/IPersonal";

export interface ISubunitEntity{
  id: number,
  name: string,
  supervisor?: IPersonalEntity | null,
  supervisor_inn?: number,
  parent_subunit_id?: number | null,
}