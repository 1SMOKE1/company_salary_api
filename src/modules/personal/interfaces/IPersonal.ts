import { PhysicalFaceEntity } from "src/modules/physical_face/physical_face.entity";
import { IPositionEntity } from "src/modules/position/interfaces/IPosition";
import { SubunitEntity } from "src/modules/subunit/subunit.entity";

export interface IPersonalEntity{
  id: number,
  position: IPositionEntity,
  subunit: SubunitEntity,
  salary: number,
  physical_face: PhysicalFaceEntity,
  begin_date: Date | string
}