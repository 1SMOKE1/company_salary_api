import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from './position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  providers: []
})
export class PositionModule {}
