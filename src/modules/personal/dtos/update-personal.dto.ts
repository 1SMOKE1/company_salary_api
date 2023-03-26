

export class UpdatePersonalDto{
  id: number;
  name: string;
  subunit_name: string;
  position_name: string;
  physical_face_inn: number;
  salary?: number;
  begin_date?: Date;
}