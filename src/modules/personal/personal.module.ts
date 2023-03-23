import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalEntity } from './personal.entity';
import { PersonalService } from './services/personal.service';
import { PersonalController } from './controllers/personal.controller';
import { PositionModule } from '../position/position.module';
import { PhysicalFaceModule } from '../physical_face/physical_face.module';
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
  ],
  controllers: [
    PersonalController
  ],
  exports: [TypeOrmModule.forFeature([PersonalEntity])]
})
export class PersonalModule {}
