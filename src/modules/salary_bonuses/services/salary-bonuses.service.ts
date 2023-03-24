import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalarybonusEntity } from '../salary-bonuses.entity';
import { CreateSalarybonusDto } from '../dtos/create-salary-bonuces.dto';
import { UpdateSalarybonusDto } from '../dtos/update-salary-bonuces.dto.ts';

@Injectable()
export class SalarybonusesService {
  constructor(
    @InjectRepository(SalarybonusEntity)
    private readonly salarybonusEntity: Repository<SalarybonusEntity>,
  ) {}

  async getAll() {
    return await this.salarybonusEntity.find();
  }

  async getOneById(id: number) {
    return await this.salarybonusEntity.findOne({ where: { id } });
  }

  async createOne(body: CreateSalarybonusDto) {
    const newSalarybonus = this.salarybonusEntity.create(body);
    return await this.salarybonusEntity.save(newSalarybonus);
  }

  async updateOne(id: number, body: UpdateSalarybonusDto) {
    return await this.salarybonusEntity.update({ id }, {...body});
  }

  async deleteOne(id: number) {
    return await this.salarybonusEntity.delete({ id });
  }
}
