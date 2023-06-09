import {
  Body,
  Controller,
  Delete,
  Get,
  BadRequestException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PhysicalFaceService } from '../services/physical_face.service';
import { Response } from 'express';
import { CreatePhysicalFaceDto } from '../dtos/create-physical_face.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UpdatePhysicalFaceDto } from '../dtos/update-physical_face.dto';

@Controller('physical-faces')
export class PhysicalFaceController {
  constructor(private readonly physicalFaceService: PhysicalFaceService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const physicalFaces = await this.physicalFaceService.getAll();
      res.status(HttpStatus.OK).json(physicalFaces);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const currentPhysicalPhace = await this.physicalFaceService.getOne(id);
      return res.status(200).json(currentPhysicalPhace);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async addOne(
    @Body() createPhysicalFaceDto: CreatePhysicalFaceDto,
    @Res() res: Response,
  ) {
    try {
      const newPhysicalFace = await this.physicalFaceService.addOne(
        createPhysicalFaceDto,
      );
      return res.status(200).json(newPhysicalFace);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhysicalFaceDto: UpdatePhysicalFaceDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPhysicalFace = await this.physicalFaceService
        .updateOne(id, updatePhysicalFaceDto)
        .then(() => this.physicalFaceService.getOne(id));
      return res.status(HttpStatus.OK).json(updatedPhysicalFace);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedPhysicalFace = await this.physicalFaceService
        .deleteOne(id)
        .then(() => ({ message: `Deleted item by id: ${id}` }));
      return res.status(HttpStatus.OK).json(deletedPhysicalFace);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
