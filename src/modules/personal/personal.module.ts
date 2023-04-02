import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalEntity } from './personal.entity';
import { PersonalService } from './services/personal.service';
import { PersonalController } from './controllers/personal.controller';
import { PositionModule } from '../position/position.module';
import { PhysicalFaceModule } from '../physical_face/physical_face.module';
import { SubunitModule } from '../subunit/subunit.module';
import { CalculateSalaryService } from './services/calculate-salary.service';
import { CalculateSalaryController } from './controllers/calculate-salary.controller';
import { SalarybonusesModule } from '../salary_bonuses/salary-bonuses.module';
import { PhysicalFaceService } from '../physical_face/services/physical_face.service';


@Module({
  imports: [
    PositionModule,
    PhysicalFaceModule,
    SubunitModule,
    SalarybonusesModule,
    TypeOrmModule.forFeature([PersonalEntity]),
  ],
  providers: [PersonalService, CalculateSalaryService, PhysicalFaceService],
  controllers: [PersonalController, CalculateSalaryController],
  exports: [TypeOrmModule.forFeature([PersonalEntity])],
})
export class PersonalModule {}
