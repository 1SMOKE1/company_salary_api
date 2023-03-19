import { PhysicalFaceEntity } from "src/modules/physical_face/physical_face.entity";
import { PositionEntity } from "src/modules/position/position.entity";
import { SubunitEntity } from "src/modules/subunit/subunit.entity";

export interface IPersonalEntity{
  id: number,
  name: string,
  position: PositionEntity,
  subunit: SubunitEntity,
  salary: number,
  physical_face: PhysicalFaceEntity,
  begin_date: Date
}