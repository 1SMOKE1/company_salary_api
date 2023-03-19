import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { ICreatePersonalDto } from '../interfaces/ICreatePersonal';
import { PersonalService } from '../services/personal.service';

@Controller('personal')
export class PersonalController {

  constructor(
    private readonly personalService: PersonalService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ){ 
    try{
      const personal = await this.personalService.getAll();
      return res.status(HttpStatus.OK).json(personal);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try{
      const person = await this.personalService.getOne(id);
      return res.status(HttpStatus.OK).json(person);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  @Post()
  async createOne(
    @Body() persona: ICreatePersonalDto,
    @Res() res: Response
  ){
    try{
      const newPersona = await this.personalService.createOne(persona);
      return res.status(HttpStatus.OK).json(newPersona);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN);
    }
  }

}
