import {
  Controller,
  BadRequestException,
  HttpStatus,
  Param,
  Res,
  Get, ParseIntPipe
} from '@nestjs/common';
import { Response } from 'express';
import { CalculateSalaryService } from '../services/calculate-salary.service';

@Controller('calculate-salary')
export class CalculateSalaryController {
  constructor(
    private readonly calculateSalaryService: CalculateSalaryService,
  ) {}

  @Get()
  async calculateCompanySalary(@Res() res: Response) {
    try {
      const companySalary =
        await this.calculateSalaryService.calculateCompanySalary();
      return res.status(HttpStatus.OK).json(companySalary);
    } catch (err) {
      const { message, status } = err;
      throw new BadRequestException(message, status);
    }
  }

  @Get(':id')
  async calculateById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const calculateSalary = await this.calculateSalaryService.calculateById(
        id,
      );
      return res.status(HttpStatus.OK).json(calculateSalary);
    } catch (err) {
      const { message, status } = err;
      throw new BadRequestException(message, status);
    }
  }
}
