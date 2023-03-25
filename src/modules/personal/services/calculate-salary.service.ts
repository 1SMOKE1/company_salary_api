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

  async calculate(item: IPersonalEntity): Promise<number> {
    if (item.position.supervisor_access) {
      const {salaryBonus} = await this.subordinatesBonus(item);

      return await this.calculateSalary(item) + salaryBonus;
    }
    return await this.calculateSalary(item);
  }

  async calculateSalary(item: IPersonalEntity): Promise<number> {

    const currentPosition = await this.positionRepository.findOne({relations: {
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

  toPercents(value: number): number{
    return value * 0.01;
  }

  async subordinatesBonus(item: IPersonalEntity): Promise<{salaryBonus: number}>{


    const subordinatesLimit = await this.convertSalaryBonusLvl(item);
    const subordinatePercentBonus = await this.getSubordinatePercentBonus(item);


    const {subordinates, percentFromSalary}  = await this.getSubordinates(item, subordinatePercentBonus)

    let counter = 0;
    const salaryBonusArr: number[] = [];

    salaryBonusArr.push(percentFromSalary);

    // нужна рекурсия с промисом, переписать 
 
    for await ( const elem of subordinates){
      if(elem.position.supervisor_access){
        console.log('here');
        counter++;
        for(let i = 0; i < subordinatesLimit; i++){
          const doesSupervisor = await this.subunitRepository.findOne({relations: {
            supervisor: true
          }, where: {
            supervisor: elem
          }})

          if(doesSupervisor !== null){
            const {subordinates, percentFromSalary} = await this.getSubordinates(elem, subordinatePercentBonus)
            salaryBonusArr.push(percentFromSalary);
            
            counter += (subordinates.filter((el) => item.id !== el.id)).length;
          } 
        } 
      } else {
        counter++;
      }
    }
    const salaryBonus = salaryBonusArr.reduce((acc, cur) => acc + cur, 0);

    console.log(salaryBonus);

    return {salaryBonus};
  }


  async convertSalaryBonusLvl(item: IPersonalEntity): Promise<number>{
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
        return 0;
      case 'all':
        return 1;
    }
  }

  async getSubordinates(item: IPersonalEntity, subordinatePercentBonus: number): Promise<ISupervisorSubordinateBonus>{
    const doesSupervisor = await this.subunitRepository.findOne({relations: {
      supervisor: true
    }, where: {
      supervisor: item
    }})
    
    return await this.personalRepository.find({relations: {
      physical_face: true,
      position: true,
      subunit: true
    }, where: {subunit: doesSupervisor}})
    .then(async (elems) => {

      const elemsWithoutSupervisor = elems.filter((el) => item.id !== el.id)

      return {
        subordinates: elemsWithoutSupervisor,
        percentFromSalary: elemsWithoutSupervisor.map((el) => el.salary * subordinatePercentBonus * 0.01).reduce((acc, cur) => (acc + cur), 0)
      }
    })
  }

  async getSubordinatePercentBonus(item: IPersonalEntity): Promise<number>{
    const subordinatePercentBonus = await this.positionRepository.findOne({relations: {
      salary_bonus: true
    }, where: {id: item.position.id}})

    return subordinatePercentBonus.salary_bonus.subordinate_percent_bonus;
  }
}





