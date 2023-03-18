import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalEntity } from './personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalEntity])],
  providers: []
})
export class PersonalModule {}
