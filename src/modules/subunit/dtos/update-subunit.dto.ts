import { TGroupLevel } from "../interfaces/ISubunit";
import { IUpdateSubunitDto } from "../interfaces/IUpdateSubunitDto";

export class UpdateSubunitDto implements IUpdateSubunitDto{
  id!: number;
  name: string;
  supervisor_id?: number;
  supervisor_name?: string;
  group_id?: number;
  group_level: TGroupLevel;
}
