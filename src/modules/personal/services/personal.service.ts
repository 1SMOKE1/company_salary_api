import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from '../personal.entity';
import { Repository } from 'typeorm';
import { IPositionEntity } from 'src/modules/position/interfaces/IPosition';
import { IPhysicalFaceEntity } from 'src/modules/physical_face/interfaces/IPhysicalFace';
import { ISubunitEntity } from 'src/modules/subunit/interfaces/ISubunit';
import { IPersonalEntity } from '../interfaces/IPersonal';
import { PositionEntity } from 'src/modules/position/position.entity';
import { PhysicalFaceEntity } from 'src/modules/physical_face/physical_face.entity';
import { SubunitEntity } from 'src/modules/subunit/subunit.entity';
import { CreatePersonalDto } from '../dtos/create-personal.dto';
import { UpdatePersonalDto } from '../dtos/update-personal.dto';
import * as moment from 'moment';
import { PhysicalFaceService } from 'src/modules/physical_face/services/physical_face.service';

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
    private readonly subunitRepository: Repository<SubunitEntity>,
    @Inject(PhysicalFaceService)
    private readonly physicalFaceService: PhysicalFaceService
  ) {}

  async getAll() {
    return await this.personalRepository.find({
      relations: {
        physical_face: true,
        subunit: true,
        position: true,
      },
    });
  }

  async getOne(id: number) {
    return await this.personalRepository.find({
      where: { id },
      relations: {
        physical_face: true,
        subunit: true,
        position: true,
      },
    });
  }

  async createOne(body: CreatePersonalDto) {
    const {
      physical_face_inn,
      position_name,
      subunit_name,
      salary,
      begin_date,
    } = body;

    const newPerson: IPersonalEntity = new PersonalEntity();

    if(physical_face_inn &&!this.physicalFaceService.isValidInn(physical_face_inn)
      ){
      throw new HttpException(
        'Your inn must be 10 numbers', HttpStatus.BAD_REQUEST
      )
    }
    

    const physicalFace: IPhysicalFaceEntity =
      await this.physicalFaceRepository.findOne({
        where: { inn: physical_face_inn },
      });

    const position: IPositionEntity = await this.positionRepository.findOne({
      where: { name: position_name },
    });

    const subunit: ISubunitEntity = await this.subunitRepository.findOne({
      where: { name: subunit_name },
    });

    if (physicalFace && physicalFace.inn === physical_face_inn ) {
      newPerson.physical_face = physicalFace;
    } else {
      throw new HttpException(
        `Physical_face with inn: ${physical_face_inn}, doesn\'t exists. Create it or write another one physical_face_inn`,
        HttpStatus.NOT_FOUND
      );
    }

    if (subunit) {
      newPerson.subunit = subunit;
    } else {
      throw new HttpException(
        `Subunit_name with name: ${subunit_name}, doesn\'t exists. Create it or write another one subunit_name`,
        HttpStatus.NOT_FOUND
      );
    }

    if (position && position.name === position_name) {
      newPerson.position = position;
    } else {
      const positions: IPositionEntity[] =
        await this.positionRepository.find();
      const errorMessage = `No such position with name ${position_name}. You could chose from:[${positions.map(
        ({ name }) => `${name}`,
      )}]`;
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    if (salary) {
      newPerson.salary = salary;
    }

    if (begin_date) {
      if (!moment(begin_date, 'DD.MM.YYYY', true).isValid()) {
        throw new HttpException(
          `This begin_date is incorrect pls use this pattern: 'DD.MM.YYYY' `,
          HttpStatus.BAD_REQUEST
        );
      } else {
        newPerson.begin_date = begin_date;
      }
    }

    return await this.personalRepository.save(newPerson);
  }

  async updateOne(id: number, body: UpdatePersonalDto) {

    const {
      physical_face_inn,
      position_name,
      subunit_name,
      salary,
      begin_date,
    } = body;

       

      const updatedPerson = new PersonalEntity();

      if(begin_date && !this.physicalFaceService.checkAccessOnWork(begin_date.toLocaleString().split(',')[0])){
          throw new HttpException(
            'You must have 18+ age for get a job', HttpStatus.BAD_REQUEST
          )
        }

      if(physical_face_inn && !this.physicalFaceService.isValidInn(physical_face_inn)){
        throw new HttpException(
          'Your inn must be 10 numbers', HttpStatus.BAD_REQUEST
        )
      }

      const physicalFace: IPhysicalFaceEntity =
        await this.physicalFaceRepository
          .findOne({ where: { inn: physical_face_inn } })

      const position: IPositionEntity = await this.positionRepository
        .findOne({ where: { name: position_name } })


      const subunit: ISubunitEntity = await this.subunitRepository
        .findOne({ where: { name: subunit_name } })
        
      if (physicalFace && physicalFace.inn === physical_face_inn) {
        updatedPerson.physical_face = physicalFace;
      } else {
        throw new HttpException(
          `Physical_face with inn: ${physical_face_inn}, doesn\'t exists. Create it or write another one physical_face_inn`,
          HttpStatus.NOT_FOUND
        );
      }

      if (subunit) {
        updatedPerson.subunit = subunit;
      } else {
        throw new HttpException(
          `Subunit_name with name: ${subunit_name}, doesn\'t exists. Create it or write another one subunit_name`,
          HttpStatus.NOT_FOUND
        );
      }

      if (position === null && position.name !== position_name) {
        const positions: IPositionEntity[] =
          await this.positionRepository.find();
        const errorMessage = `No such position with name ${position_name}. You could chose from:[${positions.map(
          ({ name }) => `${name}`,
        )}]`;
        throw new HttpException(errorMessage, HttpStatus.CONFLICT);
      }

      updatedPerson.position = position;

      if (salary) {
        updatedPerson.salary = salary;
      }

      if (begin_date && !moment(begin_date, 'DD.MM.YYYY', true).isValid()) {
        throw new HttpException(
          `This begin_date is incorrect pls use this pattern: 'DD.MM.YYYY' `,
          HttpStatus.BAD_REQUEST
        );
      } 
      
      updatedPerson.begin_date = begin_date;
      

      return await this.personalRepository.update(
        { id },
        {
          ...updatedPerson
        },
      );
    
  }

  async deleteOne(id: number) {
  
    const currentSubunit = await this.personalRepository.findOne({where: {id}})
    .then(({id}) => this.subunitRepository.findOne({where: {id}}))
    if(currentSubunit){
      throw new HttpException(
        `Set to null supervisor_id in subunit table by id: ${currentSubunit.id}, for fire this person. Because he is supervisor`,
        HttpStatus.CONFLICT
      )
    }
    return await this.personalRepository.delete({ id });
    
  }
}
