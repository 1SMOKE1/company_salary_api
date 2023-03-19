import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from '../personal.entity';
import { Repository } from 'typeorm'; 
import { ICreatePersonalDto } from '../interfaces/ICreatePersonal';
import { PositionService } from 'src/modules/position/services/position.service';
import { IPositionEntity } from 'src/modules/position/interfaces/IPosition';
import { IPhysicalFaceEntity } from 'src/modules/physical_face/interfaces/IPhysicalFace';
import { PhysicalFaceService } from 'src/modules/physical_face/services/physical_face.service';
import { SubunitService } from 'src/modules/subunit/services/subunit.service';
import { ISubunitEntity } from 'src/modules/subunit/interfaces/ISubunit';
import { IPersonalEntity } from '../interfaces/IPersonal';






@Injectable()
export class PersonalService {
  
  constructor(
    @InjectRepository(PersonalEntity)
    private personalRepository: Repository<PersonalEntity>,
    @Inject(PositionService)
    private readonly positionService: PositionService,
    @Inject(PhysicalFaceService)
    private readonly physicalFaceService: PhysicalFaceService,
    @Inject(SubunitService)
    private readonly subunitService: SubunitService
  ){}

  async getAll(){
    return await this.personalRepository.find({
      relations: {
        physical_face: true,
        subunit: true,
        position: true
      }
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

      const physicalFace: IPhysicalFaceEntity = await this.physicalFaceService.getOneByCond('inn', physical_face_inn)
      .then(([item]: IPhysicalFaceEntity[]): IPhysicalFaceEntity => item);

      const position: IPositionEntity = await this.positionService.getOneByCond('name', position_name)
      .then(([item]: IPositionEntity[]): IPositionEntity => item);
      
      const subunit: ISubunitEntity = await this.subunitService.getOneByCond('name', subunit_name)
      .then(([item]: ISubunitEntity[]): ISubunitEntity => item);
      
        if(physicalFace){
          if(physicalFace.inn === physical_face_inn){
            newPerson.physical_face = {...physicalFace};
            newPerson.name = physicalFace.name;
          }
        } else {
          throw new Error (`Physical_face with inn: ${physical_face_inn}, doesn\'t exists. Create it or write another one physical_face_inn`)
        }

        if(subunit){
          newPerson.subunit = {...subunit};
        } else {
          throw new Error (`Subunit_name with name: ${subunit_name}, doesn\'t exists. Create it or write another one subunit_name`)
        }

        if(position){
          if(position.name === position_name){
            newPerson.position = {...position};
          } 
        } else {
          const positions: IPositionEntity[] = await this.positionService.getAll();
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
 
}
