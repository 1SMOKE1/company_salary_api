import { EGender } from "../interfaces/IPhysicalFace";

export class UpdatePhysicalFaceDto{
  id: number;
  name: string;
  inn: number;
  birthday: string;
  education: string;
  gender: EGender;
}