import { IUpdatePositionDto } from "../interfaces/IUpdatePositionDto";

export class UpdatePositionDto implements IUpdatePositionDto{
  id: number;
  name: string;
  supervisor_access: boolean;
}
