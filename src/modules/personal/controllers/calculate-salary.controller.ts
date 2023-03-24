import { Controller, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { Get, ParseIntPipe } from '@nestjs/common'
import { Response } from 'express';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { CalculateSalaryService } from '../services/calculate-salary.service';

@Controller('calculate-salary')
export class CalculateSalaryController {

  constructor(
    private readonly calculateSalaryService: CalculateSalaryService
  ){}

  @Get(':id')
  async calculateById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try{
      const calculateSalary = await this.calculateSalaryService.calculateById(id);
      return res.status(HttpStatus.OK).json(calculateSalary);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN);
    }
  }
}
