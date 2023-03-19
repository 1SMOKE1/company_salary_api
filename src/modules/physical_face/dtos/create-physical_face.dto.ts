import { EGender, IPhysicalFaceModel } from "../interfaces/IPhysicalFace";



export class CreatePhysicalFaceDto implements IPhysicalFaceModel{
  id: number;
  name: string;
  inn: number;
  birthday: string;
  education: string;
  gender: EGender;
}