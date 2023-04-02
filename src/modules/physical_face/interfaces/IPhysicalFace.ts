export interface IPhysicalFaceEntity{
  id: number,
  name: string,
  inn: number,
  birthday: string,
  education?: string,
  gender: string
}

export enum EGender{
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

