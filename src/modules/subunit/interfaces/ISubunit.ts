
export type TGroupLevel = 0 | 1 | 2;

export interface ISubunitEntity{
  id: number,
  name: string,
  supervisor_id?: number,
  supervisor_name?: string,
  group_id?: number
  group_level: TGroupLevel,
}