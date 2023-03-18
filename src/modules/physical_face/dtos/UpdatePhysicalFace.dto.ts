import { EGender } from "../interfaces/IPhysicalFace";
import { IUpdatePhysicalFaceDto } from "../interfaces/IUpdatePhysicalFaceDto";


export class UpdatePhysicalFaceDto implements IUpdatePhysicalFaceDto{
  id: number;
  name: string;
  inn: number;
  birthday: string;
  education: string;
  gender: EGender;
}