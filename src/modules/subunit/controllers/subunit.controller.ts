import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { CreateSubunitDto } from '../dtos/create-subunit.dto';
import { UpdateSubunitDto } from '../dtos/update-subunit.dto';
import { SubunitService } from '../services/subunit.service';

@Controller('subunits')
export class SubunitController {

  constructor(
    private readonly subunitService: SubunitService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ){
    try{
      const subunits = await this.subunitService.getAll();
      return res.status(HttpStatus.OK).json(subunits);
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
      const subunit = await this.subunitService.getOne(id);
      return res.status(HttpStatus.OK).json(subunit);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  @Post()
  async createOne(
    @Body() subunit: CreateSubunitDto,
    @Res() res: Response
  ){
    try{
      const newSubunit = await this.subunitService.createOne(subunit);
      return res.status(HttpStatus.OK).json(newSubunit);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN)
    }
  }

  @Put(":id")
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() subunit: UpdateSubunitDto,
    @Res() res: Response
  ){
    try{  
      const updatedSubunit = await this.subunitService.updateOne(id, subunit)
      .then(() => this.subunitService.getOne(id));
      return res.status(HttpStatus.OK).json(updatedSubunit);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN)
    }
  }

  @Delete(":id")
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try{
      const deletedSubunit = await this.subunitService.deleteOne(id)
      return res.status(HttpStatus.OK).json(deletedSubunit);
    } catch (err) {
      throw new HttpException(getErrorMessage(err), HttpStatus.FORBIDDEN)
    }
  }

  
}
