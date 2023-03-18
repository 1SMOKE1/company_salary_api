import { EGender } from "./IPhysicalFace";

export interface ICreatePhysicalFaceDto{
  id: number,
  name: string,
  inn: number,
  birthday: string,
  education?: string,
  gender: EGender
}
