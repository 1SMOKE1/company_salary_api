import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from '../personal.entity';
import { Repository } from 'typeorm';
import { IPersonalEntity } from '../interfaces/IPersonal';
import * as moment from 'moment';
import { SubunitEntity } from 'src/modules/subunit/subunit.entity';
import { SalarybonusEntity } from 'src/modules/salary_bonuses/salary-bonuses.entity';
import { PositionEntity } from 'src/modules/position/position.entity';

@Injectable()
export class CalculateSalaryService {
  constructor(
    @InjectRepository(PersonalEntity)
    private personalRepository: Repository<PersonalEntity>,
    @InjectRepository(SubunitEntity)
    private subunitRepository: Repository<SubunitEntity>,
    @InjectRepository(SalarybonusEntity)
    private salarybonusRepository: Repository<SalarybonusEntity>,
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
      return await this.calculateSalary(item);
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

  // async calculate(item: IPersonalEntity){
  //   switch(item.position.name){
  //     case 'Employee':
  //       return item.salary + (item.salary * (this.salarybonus.employee.percentsPerYear * 0.01 * this.fullYearsOfWork(item)));
  //     case 'Manager':
  //       const count = await this.subordinatesbonus(item);
  //       console.log(count);
  //       return item.salary + (item.salary * (this.salarybonus.manager.percentsPerYear * 0.01 * this.fullYearsOfWork(item)))
  //       + (this.salarybonus.manager.pecentsPerSubordinate * 0.01 * await this.subordinatesbonus(item));
  //     case 'Sayles':
  //       break;
  //   }
  // }

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

  // async subordinatesbonus(item: IPersonalEntity): Promise<number>{

  //   let counter = 0;
  //   const arrSalary = []

  //   const subunitHead = await this.subunitRepository.findOne({where: {supervisor_inn: item.physical_face.inn}});
  //   if(subunitHead){
  //     const subordinatesArr = await this.personalRepository.find({relations: {
  //       subunit: true,
  //       physical_face: true
  //     }})
  //     for(const el of subordinatesArr){
  //       if(el.subunit.id === subunitHead.id && el.physical_face.inn !== subunitHead.supervisor_inn){
  //         counter++;
  //         // акамулирующий массив;
  //         // arrSalary.reduce((acc, cur) => acc + cur,[])
  //       }
  //     }

  //   }
  //   return counter
  // }
}
