import { IPersonalEntity } from "./IPersonal";

export interface ISupervisorSubordinateBonus{
  subordinates: IPersonalEntity[];
  percentFromSalary: number;
}