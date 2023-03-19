import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalEntity } from './personal.entity';
import { PersonalService } from './services/personal.service';
import { PersonalController } from './controllers/personal.controller';
import { PositionService } from '../position/services/position.service';
import { PositionModule } from '../position/position.module';
import { PhysicalFaceModule } from '../physical_face/physical_face.module';
import { PhysicalFaceService } from '../physical_face/services/physical_face.service';
import { SubunitService } from '../subunit/services/subunit.service';
import { SubunitModule } from '../subunit/subunit.module';

@Module({
  imports: [
    PositionModule,
    PhysicalFaceModule,
    SubunitModule,
    TypeOrmModule.forFeature([PersonalEntity])
  ],
  providers: [
    PersonalService,
    PositionService,
    PhysicalFaceService,
    SubunitService
  ],
  controllers: [
    PersonalController
  ]
})
export class PersonalModule {}
