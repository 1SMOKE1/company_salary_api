import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubunitEntity } from './subunit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubunitEntity])],
  providers: []
})
export class SubunitModule {}
