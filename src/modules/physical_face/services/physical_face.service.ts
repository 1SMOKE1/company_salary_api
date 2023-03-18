import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalFaceEntity } from '../physical_face.entity';
import { Repository } from 'typeorm';
import { IUpdatePhysicalFaceDto } from '../interfaces/IUpdatePhysicalFaceDto';
import { ICreatePhysicalFaceDto } from '../interfaces/ICreatePhysicalFaceDto'; 

@Injectable()
export class PhysicalFaceService {

  constructor(
    @InjectRepository(PhysicalFaceEntity)
    private physicalFaceRepository: Repository<PhysicalFaceEntity>,
  ){}

  async getAll(): Promise<PhysicalFaceEntity[]>{
    return await this.physicalFaceRepository.find();
  }

  async getOne(id: number): Promise<PhysicalFaceEntity>{
    return await this.getAll()
    .then((data: PhysicalFaceEntity[]) => (
      data.find((el: PhysicalFaceEntity): boolean => el.id === id)))
  }

  async addOne(body: ICreatePhysicalFaceDto): Promise<PhysicalFaceEntity>{
    const newPhysicalFace = this.physicalFaceRepository.create({...body});
    return await this.physicalFaceRepository.save(newPhysicalFace);
  }

  async updateOne(id: number, body: IUpdatePhysicalFaceDto){
    return await this.physicalFaceRepository.update({id}, {...body});
  }

  async deleteOne(id: number){
    return await this.physicalFaceRepository.delete({id});
  }

}
