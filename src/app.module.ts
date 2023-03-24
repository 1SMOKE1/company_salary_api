import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhysicalFaceModule } from './modules/physical_face/physical_face.module';
import { PersonalModule } from './modules/personal/personal.module';
import { PositionModule } from './modules/position/position.module';
import { SubunitModule } from './modules/subunit/subunit.module';
import { PhysicalFaceEntity } from './modules/physical_face/physical_face.entity';
import { PositionEntity } from './modules/position/position.entity';
import { PersonalEntity } from './modules/personal/personal.entity';
import { SubunitEntity } from './modules/subunit/subunit.entity';
import { SalarybonusesModule } from './modules/salary_bonuses/salary-bonuses.module';
import { SalarybonusEntity } from './modules/salary_bonuses/salary-bonuses.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: `src/db/${configService.get('DB__NAME')}.db`,
        entities: [
          PhysicalFaceEntity,
          PositionEntity,
          PersonalEntity,
          SubunitEntity,
          SalarybonusEntity
        ],
        synchronize: true,
        migrations: [],
      }),
    }),
    PhysicalFaceModule,
    PersonalModule,
    PositionModule,
    SubunitModule,
    SalarybonusesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
