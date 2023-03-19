import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Response } from 'express';
import { CreatePositionDto } from '../dtos/create-position.dto';
import { UpdatePositionDto } from '../dtos/update-position.dto';
import { PositionService } from '../services/position.service';

@Controller('positions')
export class PositionController {

  constructor(
    private readonly positionService: PositionService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ) {
    try{
      const positions = await this.positionService.getAll();
      return res.status(HttpStatus.OK).json(positions);
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
      const position = await this.positionService.getOne(id);
      return res.status(HttpStatus.OK).json(position);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  @Post()
  async addOne(
    @Body() position: CreatePositionDto,
    @Res() res: Response
  ){
    try{
      const newPosition = await this.positionService.addOne(position);
      return res.status(HttpStatus.OK).json(newPosition);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() position: UpdatePositionDto,
    @Res() res: Response
  ){
    try{ 
      const updatedPosition = await this.positionService.updateOne(id, position)
      .then(() => this.positionService.getOne(id))
      return res.status(HttpStatus.OK).json({response: updatedPosition, message: `Updated item by id:${id}`})
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
}
