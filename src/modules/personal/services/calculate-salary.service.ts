import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from '../personal.entity';
import { Repository } from 'typeorm';
import { IPersonalEntity } from '../interfaces/IPersonal';
import * as moment from 'moment';
import { SubunitEntity } from 'src/modules/subunit/subunit.entity';
import { PositionEntity } from 'src/modules/position/position.entity';
import { IPositionEntity } from 'src/modules/position/interfaces/IPosition';
import { ISupervisorSubordinateBonus } from '../interfaces/ISupervisorSubordinateBonus';
import { ISubunitEntity } from 'src/modules/subunit/interfaces/ISubunit';

@Injectable()
export class CalculateSalaryService {
  constructor(
    @InjectRepository(PersonalEntity)
    private personalRepository: Repository<PersonalEntity>,
    @InjectRepository(SubunitEntity)
    private subunitRepository: Repository<SubunitEntity>,
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
  ) {}

  async calculateById(id: number) {

    return this.personalRepository
      .findOne({
        relations: {
          position: true,
          subunit: true,
          physical_face: true,
        },
        where: { id },
      })
      .then((item) => this.calculate(item));
  }

  async calculateCompanySalary(): Promise<number>{
    return this.personalRepository
      .find({
        relations: {
          position: true,
          subunit: true,
          physical_face: true,
        }
      })
      .then(async (items) => {
        const personalSalary: number[] = [];

        for await (const item of items) {
          personalSalary.push(await this.calculate(item))
        }
        return personalSalary.reduce((acc, cur) => (acc + cur), 0)
      })
  }

  async calculate(item: IPersonalEntity): Promise<number> {
    if (item.position.supervisor_access) {

      const subordinatesBonusLvl: number = await this.convertSubordinateBonusLvl(item);

      const bonusPerSubordinate = await this.getBonusPerSubordinate(item);

      const salaryBonus = await this.subordinatesBonus(subordinatesBonusLvl, item, bonusPerSubordinate);

      return await this.calculateSalary(item) + salaryBonus;
    }
    return await this.calculateSalary(item);
  }

  async calculateSalary(item: IPersonalEntity): Promise<number> {

    const currentPosition: IPositionEntity = await this.positionRepository.findOne({relations: {
      salary_bonus: true
    }, where: {id: item.position.id}})

    

    const currentPercentBonus = currentPosition.salary_bonus.percent_per_year * this.fullYearsOfWork(item);

    const currentPercentLimit = currentPosition.salary_bonus.limit_on_percent_per_year;
    

    if (currentPercentBonus > currentPercentLimit) {
      return item.salary * (1 + this.toPercents(currentPercentLimit));
    }
    return item.salary * (1 + this.toPercents(currentPercentBonus));
    
  }

  fullYearsOfWork(item: IPersonalEntity): number {
    const beginDate: number = moment(item.begin_date, 'DD.MM.YYYY')
      .toDate()
      .getFullYear();
    const currentDate: number = moment(
      new Date().toLocaleString().split(',')[0],
      'DD.MM.YYYY',
    )
      .toDate()
      .getFullYear();

    return currentDate - beginDate;
  }

  

  async subordinatesBonus(n: number, item: IPersonalEntity, bonusPerSubordinate: number): Promise<number>{
   
    const salaryBonusArr: number[] = [];

    const {subordinates, subordinatesSupervisors} = await this.getSubordinates(item);


    salaryBonusArr.push(this.countBonusToSupervisorSalary(subordinates, bonusPerSubordinate));

    salaryBonusArr.reduce((acc, cur) => (acc + cur), 0);

    const salaryBonus = salaryBonusArr.reduce((acc, cur) => acc + cur, 0);

    const allSubSubordinates: number[] = [];


    if(n === 1){
      return salaryBonus
    } else {
      if(subordinatesSupervisors.length !== 0){
        n += subordinatesSupervisors.length;
        for await(const elem of subordinatesSupervisors){
          allSubSubordinates.push(await this.subordinatesBonus(n - 1, elem, bonusPerSubordinate));
        }
        return salaryBonus + allSubSubordinates.reduce((acc, cur) => (acc + cur),0);
      } else {
        return await this.subordinatesBonus(n - 1, item, bonusPerSubordinate)
      }
    }
  }

  toPercents(value: number): number{
    return value * 0.01;
  }

  async convertSubordinateBonusLvl(item: IPersonalEntity): Promise<number>{
    const salaryBonusLvl = await this.positionRepository.findOne({
      relations: {
        salary_bonus: true
      },
      where: {
        id: item.position.id
      }
    }).then(({salary_bonus}: IPositionEntity) => salary_bonus.subordinate_lvl);

    switch(salaryBonusLvl){
      case 'first': 
        return 1;
      case 'all':
        return 10;
    }
  }

  async getSubordinates(item: IPersonalEntity): Promise<ISupervisorSubordinateBonus>{

    const doesSupervisor = await this.doesSupervisor(item);

    const subordinates = await this.personalRepository.find({relations: {
      physical_face: true,
      position: true,
      subunit: true
    }, where: {subunit: doesSupervisor}})
    .then((elems) => elems.filter((el) => item.id !== el.id))

    const subordinatesSupervisors = [];

    for await (const elem of subordinates){
      if(await this.doesSupervisor(elem)){
        subordinatesSupervisors.push(elem);
      } 
    }

    return {subordinates, subordinatesSupervisors}
  }

  countBonusToSupervisorSalary(items: IPersonalEntity[], subordinatePercentBonus: number): number{
    return items.map((el) => el.salary * subordinatePercentBonus * 0.01).reduce((acc, cur) => (acc + cur), 0);
  }

  async getBonusPerSubordinate(item: IPersonalEntity): Promise<number>{
    const subordinatePercentBonus = await this.positionRepository.findOne({relations: {
      salary_bonus: true
    }, where: {id: item.position.id}})

    return subordinatePercentBonus.salary_bonus.subordinate_percent_bonus;
  }

  async doesSupervisor(item: IPersonalEntity): Promise<ISubunitEntity | null>{
    return await this.subunitRepository.findOne({relations: {
      supervisor: true
    }, where: {
      supervisor: item
    }})
  }

  
}





