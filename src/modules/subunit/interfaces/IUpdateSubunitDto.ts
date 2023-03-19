import { TGroupLevel } from "./ISubunit";

export interface IUpdateSubunitDto{
  id: number,
  name: string,
  supervisor_id?: number,
  supervisor_name?: string,
  group_id?: number,
  group_level: TGroupLevel
}