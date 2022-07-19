import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver.service';
import { DriverEntity } from './entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity])],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
