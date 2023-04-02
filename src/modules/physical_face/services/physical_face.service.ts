import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalFaceEntity } from '../physical_face.entity';
import { Repository } from 'typeorm';
import { CreatePhysicalFaceDto } from '../dtos/create-physical_face.dto';
import { UpdatePhysicalFaceDto } from '../dtos/update-physical_face.dto';
import * as moment from 'moment';
import { IPhysicalFaceEntity } from '../interfaces/IPhysicalFace';

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

      const { birthday, inn } = body;

      const newPhysicalFaceBody: IPhysicalFaceEntity = new PhysicalFaceEntity();

      if(birthday){
        
        if (!moment(birthday, 'DD.MM.YYYY', true).isValid()) {
          throw new HttpException(
            `This birthday is incorrect pls use this pattern: 'DD.MM.YYYY' `,
            HttpStatus.BAD_REQUEST
          );
        } 
        if(!this.checkAccessOnWork(birthday)){
          throw new HttpException(
            'You must have 18+ age for get a job', HttpStatus.BAD_REQUEST
          )
        }
        newPhysicalFaceBody.birthday = birthday;
      }

      if(inn){
        if(!this.isValidInn(inn)){
          throw new HttpException(
            'Your inn must be 10 numbers', HttpStatus.BAD_REQUEST
          )
        }
        newPhysicalFaceBody.inn = inn;
      }

      

      const newPhysicalFace = this.physicalFaceRepository.create({...body, ...newPhysicalFaceBody});
      return await this.physicalFaceRepository.save(newPhysicalFace);
    } catch (err) {
      if(err.errno === 19){
        throw new HttpException('Physical_face with current inn already exists', HttpStatus.CONFLICT)
      }
    } 
  }

  async updateOne(id: number, body: UpdatePhysicalFaceDto){

    const { birthday, inn } = body;

      const updatedPhysicalFaceBody: IPhysicalFaceEntity = new PhysicalFaceEntity();

      if(birthday){
        if (!moment(birthday, 'DD.MM.YYYY', true).isValid()) {
          throw new HttpException(
            `This birthday is incorrect pls use this pattern: 'DD.MM.YYYY' `,
            HttpStatus.BAD_REQUEST
          );
        } 
        if(!this.checkAccessOnWork(birthday)){
          throw new HttpException(
            'You must have 18+ age for get a job', HttpStatus.BAD_REQUEST
          )
        }
        updatedPhysicalFaceBody.birthday = birthday;
      }

      if(inn){
        if(!this.isValidInn(inn)){
          throw new HttpException(
            'Your inn must be 10 numbers', HttpStatus.BAD_REQUEST
          )
        }
        updatedPhysicalFaceBody.inn = inn;
      }

    return await this.physicalFaceRepository.update({id}, {...body, ...updatedPhysicalFaceBody});
  }

  async deleteOne(id: number){
    return await this.physicalFaceRepository.delete({id});
  }

  checkAccessOnWork(birthday: string): boolean{
    const currentDate: number = moment(
      new Date().toLocaleString().split(',')[0],
      'DD.MM.YYYY',
    )
      .toDate()
      .getFullYear();
    const beginDate: number = moment(birthday, 'DD.MM.YYYY')
      .toDate()
      .getFullYear();
    if(currentDate - beginDate >= 18){
      return true;
    }

    return false ;
  }

  isValidInn(inn: number): boolean{
    return (/\d{10}/).test(inn.toString());
  }

  

}
