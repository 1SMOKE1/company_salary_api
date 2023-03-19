import { ICreatePersonalDto } from "../interfaces/ICreatePersonal";

export class CreatePersonalDto implements ICreatePersonalDto{
  id: number;
  position_name: string;
  subunit_name: string;
  salary: number;
  physical_face_inn: number;
}
