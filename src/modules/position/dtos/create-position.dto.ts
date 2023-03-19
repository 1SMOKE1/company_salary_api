import { ICreatePositionDto } from "../interfaces/ICreatePositionDto";


export class CreatePositionDto implements ICreatePositionDto{
  id!: number;
  name: string;
  supervisor_access: boolean;
}
