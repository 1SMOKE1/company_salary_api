import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubunitEntity } from '../subunit.entity';
import { Repository } from 'typeorm';
import { ICreateSubunitDto } from '../interfaces/ICreateSubunitDto';
import { IUpdateSubunitDto } from '../interfaces/IUpdateSubunitDto';

@Injectable()
export class SubunitService {

  constructor(
    @InjectRepository(SubunitEntity)
    private subunitRepository: Repository<SubunitEntity>
  ){}

  async getAll(){
    return await this.subunitRepository.find();
  }

  async getOne(id: number){
    return await this.subunitRepository.find({where: {id}});
  }

  async getOneByCond(field: string, cond: any){
    return await this.subunitRepository.find({where: {
        [field]: cond
      }
    })
  }

  async createOne(body: ICreateSubunitDto){
    const newSubunit = this.subunitRepository.create({...body});
    return await this.subunitRepository.save(newSubunit);
  }

  async updateOne(id: number, body: IUpdateSubunitDto){
    return await this.subunitRepository.update({id}, {...body});
  }

  async deleteOne(id: number){
    return await this.subunitRepository.delete({id});
  }
  

}
