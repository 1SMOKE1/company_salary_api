import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubunitEntity } from './subunit.entity';
import { SubunitService } from './services/subunit.service';
import { SubunitController } from './controllers/subunit.controller';
import { PersonalModule } from '../personal/personal.module';



@Module({
  imports: [
    forwardRef(() => PersonalModule),
    TypeOrmModule.forFeature([SubunitEntity])],
  providers: [SubunitService],
  controllers: [SubunitController],
  exports: [TypeOrmModule.forFeature([SubunitEntity])]
})
export class SubunitModule {}
