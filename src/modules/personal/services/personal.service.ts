import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from '../personal.entity';
import { Repository } from 'typeorm'; 
import { ICreatePersonalDto } from '../interfaces/ICreatePersonal';
import { IPositionEntity } from 'src/modules/position/interfaces/IPosition';
import { IPhysicalFaceEntity } from 'src/modules/physical_face/interfaces/IPhysicalFace';
import { ISubunitEntity } from 'src/modules/subunit/interfaces/ISubunit';
import { IPersonalEntity } from '../interfaces/IPersonal';
import { PositionEntity } from 'src/modules/position/position.entity';
import { PhysicalFaceEntity } from 'src/modules/physical_face/physical_face.entity';
import { SubunitEntity } from 'src/modules/subunit/subunit.entity';
import { IUpdatePersonalDto } from '../interfaces/IUpdatePersonal';






@Injectable()
export class PersonalService {
  
  constructor(
    @InjectRepository(PersonalEntity)
    private readonly personalRepository: Repository<PersonalEntity>,
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
    @InjectRepository(PhysicalFaceEntity)
    private readonly physicalFaceRepository: Repository<PhysicalFaceEntity>,
    @InjectRepository(SubunitEntity)
    private readonly subunitRepository: Repository<SubunitEntity>
  ){}

  async getAll(){
    return await this.personalRepository.find({
      relations: {
        physical_face: true,
        subunit: true,
        position: true
      },
    })
  }

  async getOne(id: number){
    return await this.personalRepository.find({where: {id}, relations: {
      physical_face: true,
      subunit: true,
      position: true
    }});
  }

  async createOne(body: ICreatePersonalDto){

    const {physical_face_inn, position_name, subunit_name, salary} = body;

    const newPerson: IPersonalEntity = new PersonalEntity();
    
    try{

      const physicalFace: IPhysicalFaceEntity = await this.physicalFaceRepository.find({where: {inn: physical_face_inn}})
      .then(([physicalFace]: IPhysicalFaceEntity[]): IPhysicalFaceEntity => physicalFace);

      const position: IPositionEntity = await this.positionRepository.find({where: {name: position_name}})
      .then(([position]: IPositionEntity[]): IPositionEntity => position);
      
      const subunit: ISubunitEntity = await this.subunitRepository.find({where: {name: subunit_name}})
      .then(([subunit]: ISubunitEntity[]): ISubunitEntity => subunit);
        if(physicalFace){
          if(physicalFace.inn === physical_face_inn){
            newPerson.physical_face = physicalFace;
          }
        } else {
          throw new Error (`Physical_face with inn: ${physical_face_inn}, doesn\'t exists. Create it or write another one physical_face_inn`)
        }

        if(subunit){
          newPerson.subunit = subunit;
        } else {
          throw new Error (`Subunit_name with name: ${subunit_name}, doesn\'t exists. Create it or write another one subunit_name`)
        }

        if(position){
          if(position.name === position_name){
            newPerson.position = position;
          } 
        } else {
          const positions: IPositionEntity[] = await this.positionRepository.find();
          const errorMessage = `No such position with name ${position_name}. You could chose from:[${positions.map(({name}) => `${name}`)}]`;
          throw new Error(errorMessage)
        }

        if(salary){
          newPerson.salary = salary;
        }
      return await this.personalRepository.save(newPerson);
    } catch (err) {
      throw err
    }
  }

  async updateOne(id: number, body: IUpdatePersonalDto){
    try {


      const {physical_face_inn, position_name , subunit_name, salary, begin_date} = body;

      const updatedPerson = new PersonalEntity();

      const physicalFace: IPhysicalFaceEntity = await this.physicalFaceRepository.find({where: {inn: physical_face_inn}})
      .then(([physicalFace]: IPhysicalFaceEntity[]): IPhysicalFaceEntity => physicalFace);

      const position: IPositionEntity = await this.positionRepository.find({where: {name: position_name}})
      .then(([position]: IPositionEntity[]): IPositionEntity => position);
      
      const subunit: ISubunitEntity = await this.subunitRepository.find({where: {name: subunit_name}})
      .then(([subunit]: ISubunitEntity[]): ISubunitEntity => subunit);
        if(physicalFace){
          if(physicalFace.inn === physical_face_inn){
            updatedPerson.physical_face = physicalFace;
          }
        } else {
          throw new Error (`Physical_face with inn: ${physical_face_inn}, doesn\'t exists. Create it or write another one physical_face_inn`)
        }

        if(subunit){
          updatedPerson.subunit = subunit;
        } else {
          throw new Error (`Subunit_name with name: ${subunit_name}, doesn\'t exists. Create it or write another one subunit_name`)
        }

        if(position){
          if(position.name === position_name){
            updatedPerson.position = position;
          } 
        } else {
          const positions: IPositionEntity[] = await this.positionRepository.find();
          const errorMessage = `No such position with name ${position_name}. You could chose from:[${positions.map(({name}) => `${name}`)}]`;
          throw new Error(errorMessage)
        }

        if(salary){
          updatedPerson.salary = salary;
        }

      return await this.personalRepository.update({id}, {
        ...updatedPerson,
        begin_date
      })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async deleteOne(id: number){
    try{
      const currentSubunit = await this.personalRepository.find({where: {id}})
      .then(([person]) => person)
      .then(({id}) => this.subunitRepository.find({where: {id}}))
      .then(([subunit]) => subunit);
      if(currentSubunit){
        throw new Error(`Set to null supervisor_id in subunit table by id: ${currentSubunit.id}, for fire this person. Because he is supervisor`)
      }
      return await this.personalRepository.delete({id})
    } catch (err) {
      throw err;
    }
  }
 
}
