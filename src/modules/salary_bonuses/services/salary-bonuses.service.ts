import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalarybonusEntity } from '../salary-bonuses.entity';
import { CreateSalarybonusDto } from '../dtos/create-salary-bonuces.dto';
import { UpdateSalarybonusDto } from '../dtos/update-salary-bonuces.dto.ts';
import { Esubordinate_lvl } from '../interfaces/ISalarybonus';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

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

    const {subordinate_lvl} = body;

    if(subordinate_lvl){
      const values = Object.values(Esubordinate_lvl);
      if(!this.checkEnumCond(subordinate_lvl)){
        throw new HttpException(`this subordinate_lvl doesn't exists. You could choose from [${values.map((el) => `'${el}'`)}]`, HttpStatus.NOT_FOUND)
      }
    }
    
    const newSalarybonus = this.salarybonusEntity.create(body);
    return await this.salarybonusEntity.save(newSalarybonus);
  }

  async updateOne(id: number, body: UpdateSalarybonusDto) {

    const {subordinate_lvl} = body;

    if(subordinate_lvl){
      const values = Object.values(Esubordinate_lvl);
      if(!this.checkEnumCond(subordinate_lvl)){
        throw new HttpException(`this subordinate_lvl doesn't exists. You could choose from [${values.map((el) => `'${el}'`)}]`, HttpStatus.NOT_FOUND)
      }
    }

    return await this.salarybonusEntity.update({ id }, {...body});
  }

  async deleteOne(id: number) {
    return await this.salarybonusEntity.delete({ id });
  }

  checkEnumCond(subordinate_lvl: string){
    let subordinateCondExists = false;
    for(const key in Esubordinate_lvl){
      if(Esubordinate_lvl[key] === subordinate_lvl){
        return subordinateCondExists = true;
      }
    }
    return subordinateCondExists;
  }
}
