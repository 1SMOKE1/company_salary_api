import { IPhysicalFaceEntity } from "src/modules/physical_face/interfaces/IPhysicalFace";
import { IPositionEntity } from "src/modules/position/interfaces/IPosition";
import { ISubunitEntity } from "src/modules/subunit/interfaces/ISubunit";

export interface IPersonalEntity{
  id: number,
  name: string,
  position: IPositionEntity,
  subunit: ISubunitEntity,
  salary: number,
  tab_num: string,
  physical_face: IPhysicalFaceEntity,
  begin_date: Date
}