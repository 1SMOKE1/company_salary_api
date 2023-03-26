import { IPersonalEntity } from "./IPersonal";

export interface ISupervisorSubordinateBonus{
  subordinates: IPersonalEntity[];
  subordinatesSupervisors: IPersonalEntity[];
}