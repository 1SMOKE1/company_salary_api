import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalFaceEntity } from './physical_face.entity';
import { PhysicalFaceService } from './services/physical_face.service';
import { PhysicalFaceController } from './controllers/physical_face.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalFaceEntity])],
  providers: [PhysicalFaceService],
  controllers: [PhysicalFaceController],
  exports: [TypeOrmModule.forFeature([PhysicalFaceEntity])]
})
export class PhysicalFaceModule {}
