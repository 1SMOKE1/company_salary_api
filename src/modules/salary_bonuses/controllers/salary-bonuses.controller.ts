import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { CreateSalarybonusDto } from '../dtos/create-salary-bonuces.dto';
import { UpdateSalarybonusDto } from '../dtos/update-salary-bonuces.dto.ts';
import { SalarybonusesService } from '../services/salary-bonuses.service';

@Controller('salary-bonuses')
export class SalarybonusesController {
  constructor(private readonly salarybonusService: SalarybonusesService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const salarybonus = await this.salarybonusService.getAll();
      return res.status(HttpStatus.OK).json(salarybonus);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.CONFLICT);
    }
  }

  @Get(':id')
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const salarybonus = await this.salarybonusService.getOneById(id);
      return res.status(HttpStatus.OK).json(salarybonus);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.CONFLICT);
    }
  }

  @Post()
  async createOne(
    @Body() salarybonus: CreateSalarybonusDto,
    @Res() res: Response,
  ) {
    try {
      const newSalarybonus = await this.salarybonusService.createOne(
        salarybonus,
      );
      return res.status(HttpStatus.OK).json(newSalarybonus);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.CONFLICT);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() salarybonus: UpdateSalarybonusDto,
    @Res() res: Response,
  ) {
    try {
      const updatedSalarybonus = await this.salarybonusService
        .updateOne(id, salarybonus)
        .then(() => this.salarybonusService.getOneById(id));
      return res.status(HttpStatus.OK).json(updatedSalarybonus);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.CONFLICT);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.salarybonusService.deleteOne(id));
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.CONFLICT);
    }
  }
}
