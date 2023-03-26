import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { CreatePersonalDto } from '../dtos/create-personal.dto';
import { UpdatePersonalDto } from '../dtos/update-personal.dto';
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
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN);
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
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  async createOne(
    @Body() person: CreatePersonalDto,
    @Res() res: Response
  ){
    try{
      const newPerson = await this.personalService.createOne(person);
      return res.status(HttpStatus.OK).json(newPerson);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() person: UpdatePersonalDto,
    @Res() res: Response
  ){
    try{
      const updatedPerson = await this.personalService.updateOne(id, person)
      .then(() => this.personalService.getOne(id))
      return res.status(HttpStatus.OK).json(updatedPerson)
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN)
    }
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const deletedPerson = await this.personalService.deleteOne(id)
      res.status(HttpStatus.OK).json(deletedPerson);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN)
    }
  }

}
