export interface IUpdatePersonalDto{
  id: number,
  subunit_name: string,
  position_name: string,
  physical_face_inn: number,
  salary?: number,
  begin_date?: Date;
}