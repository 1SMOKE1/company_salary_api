export interface IPhysicalFaceEntity{
  id: number,
  name: string,
  inn: number,
  birthday: string,
  education?: string,
  gender: EGender
}

export enum EGender{
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

