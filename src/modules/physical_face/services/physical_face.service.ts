import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalFaceEntity } from '../physical_face.entity';
import { Repository } from 'typeorm';
import { CreatePhysicalFaceDto } from '../dtos/create-physical_face.dto';
import { UpdatePhysicalFaceDto } from '../dtos/update-physical_face.dto';

@Injectable()
export class PhysicalFaceService {

  constructor(
    @InjectRepository(PhysicalFaceEntity)
    private physicalFaceRepository: Repository<PhysicalFaceEntity>,
  ){}

  async getAll(){
    return await this.physicalFaceRepository.find();
  }

  async getOne(id: number){
    return await this.physicalFaceRepository.find({where: {id}})
  }

  async addOne(body: CreatePhysicalFaceDto){
    try{
      const newPhysicalFace = this.physicalFaceRepository.create({...body});
      return await this.physicalFaceRepository.save(newPhysicalFace);
    } catch (err) {
      if(err.errno === 19){
        throw new Error('Physical_face with current inn already exists')
      }
    } 
  }

  async updateOne(id: number, body: UpdatePhysicalFaceDto){
    return await this.physicalFaceRepository.update({id}, {...body});
  }

  async deleteOne(id: number){
    return await this.physicalFaceRepository.delete({id});
  }

}
