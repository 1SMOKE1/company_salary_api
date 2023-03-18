import { EGender } from "./IPhysicalFace";

export interface IUpdatePhysicalFaceDto{
  id: number,
  name: string,
  inn: number,
  birthday: string,
  education?: string,
  gender: EGender
}