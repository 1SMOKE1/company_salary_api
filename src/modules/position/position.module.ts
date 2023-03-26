import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from './position.entity';
import { PositionService } from './services/position.service';
import { PositionController } from './controllers/position.controller';
import { SalarybonusesModule } from '../salary_bonuses/salary-bonuses.module';

@Module({
  imports: [SalarybonusesModule, TypeOrmModule.forFeature([PositionEntity])],
  providers: [PositionService],
  controllers: [PositionController],
  exports: [TypeOrmModule.forFeature([PositionEntity])],
})
export class PositionModule {}
