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
      .then((items) =>
        items.map(({ salary_bonus_name, ...item }: IPositionEntity) => item),
      );
  }

  async getOne(id: number) {
    return await this.positionRepository
      .findOne({
        relations: {
          salary_bonus: true,
        },
        where: { id },
      })
      .then(({ salary_bonus_name, ...item }: IPositionEntity) => item);
  }

  async addOne(body: CreatePositionDto) {
    const { salary_bonus_name } = body;

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
          throw new Error(
            `Current name doesn't exists, you could choose from [${salarybonus.map(
              (el: ISalarybonus) => el.name,
            )}]`,
          );
        }
      }

      const newPosition = this.positionRepository.create(newPositionBody,);
      return await this.positionRepository.save(newPosition);
    } catch (err) {
      throw err;
    }
  }

  async updateOne(id: number, body: UpdatePositionDto) {
    const { salary_bonus_name } = body;

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
          throw new Error(
            `Current salary_bonus_name doesn't exists, you could choose from [${salarybonus.map(
              (el: ISalarybonus) => el.name,
            )}]`,
          );
        }
      }

      return await this.positionRepository.update(
        { id },
        {...updatedPositionBody},
      );
    } catch (err) {
      throw err;
    }
  }
}
