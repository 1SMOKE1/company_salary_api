import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISalarybonus } from 'src/modules/salary_bonuses/interfaces/ISalaryBonus';
import { SalarybonusEntity } from 'src/modules/salary_bonuses/salary-bonuses.entity';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../dtos/create-position.dto';
import { UpdatePositionDto } from '../dtos/update-position.dto';
import { IPositionEntity } from '../interfaces/IPosition';
import { PositionEntity } from '../position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
    @InjectRepository(SalarybonusEntity)
    private salarybonusRepository: Repository<SalarybonusEntity>,
  ) {}

  async getAll(): Promise<IPositionEntity[]> {
    return await this.positionRepository
      .find({
        relations: {
          salary_bonus: true,
        },
      })
  }

  async getOne(id: number) {
    return await this.positionRepository
      .findOne({
        relations: {
          salary_bonus: true,
        },
        where: { id },
      })
  }

  async addOne(body: CreatePositionDto) {
    const { salary_bonus_name, name, supervisor_access } = body;

    const newPositionBody: IPositionEntity = new PositionEntity();

    try {
      if (salary_bonus_name) {
        const salarybonusNameExists = await this.salarybonusRepository.findOne({
          where: { name: salary_bonus_name },
        });
        if (salarybonusNameExists) {
          newPositionBody.salary_bonus = salarybonusNameExists;
        } else {
          const salarybonus = await this.salarybonusRepository.find();
          throw new HttpException(
            `Current name doesn't exists, you could choose from [${salarybonus.map(
              (el: ISalarybonus) => el.name,
            )}]`,
            HttpStatus.NOT_FOUND
          );
        }
      }
      newPositionBody.name = name;
      newPositionBody.supervisor_access = supervisor_access;

      const newPosition = this.positionRepository.create(newPositionBody);
      return await this.positionRepository.save(newPosition);
    } catch (err) {
      throw err;
    }
  }

  async updateOne(id: number, body: UpdatePositionDto) {
    const { salary_bonus_name, name, supervisor_access } = body;

    const updatedPositionBody: IPositionEntity = new PositionEntity();

    try {
      if (salary_bonus_name) {
        const salarybonusNameExists = await this.salarybonusRepository.findOne({
          where: { name: salary_bonus_name },
        });
        if (salarybonusNameExists) {
          updatedPositionBody.salary_bonus = salarybonusNameExists;
        } else {
          const salarybonus = await this.salarybonusRepository.find();
          throw new HttpException(
            `Current salary_bonus_name doesn't exists, you could choose from [${salarybonus.map(
              (el: ISalarybonus) => el.name,
            )}]`,
            HttpStatus.NOT_FOUND
          );
        }
      }

      updatedPositionBody.name = name;
      updatedPositionBody.supervisor_access = supervisor_access;

      return await this.positionRepository.update(
        { id },
        {...updatedPositionBody},
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id: number){
    return this.positionRepository.delete({id})
  }
}
