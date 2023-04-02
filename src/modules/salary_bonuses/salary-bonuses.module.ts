import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SalarybonusesController } from './controllers/salary-bonuses.controller';
import { SalarybonusEntity } from './salary-bonuses.entity';
import { SalarybonusesService } from './services/salary-bonuses.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalarybonusEntity])],
  providers: [SalarybonusesService],
  controllers: [SalarybonusesController],
  exports: [TypeOrmModule.forFeature([SalarybonusEntity])],
})
export class SalarybonusesModule {}
