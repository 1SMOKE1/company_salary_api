import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreatePositionDto } from '../interfaces/ICreatePositionDto';
import { IPositionEntity } from '../interfaces/IPosition';
import { IUpdatePositionDto } from '../interfaces/IUpdatePositionDto';
import { PositionEntity } from '../position.entity';

@Injectable()
export class PositionService {

  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>
  ){}

  async getAll(): Promise<IPositionEntity[]>{
    return await this.positionRepository.find();
  } 

  async getOne(id: number){
    return await this.positionRepository.find({where: {id}});
  }

  async getOneByCond(field: string, cond: any){
    return await this.positionRepository.find({where: {
        [field]: cond
      }
    })
  }
  
  async addOne(body: ICreatePositionDto){
    const newPosition = this.positionRepository.create({...body});
    return await this.positionRepository.save(newPosition);
  }

  async updateOne(id: number, body: IUpdatePositionDto){
    return await this.positionRepository.update({id}, {...body});
  }


}
