import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from './entities/driver.entity';
import { IDriver, IDriverCreate } from './interfaces/driver.interfaces';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driversRepository: Repository<DriverEntity>,
  ) {}

  async findOne(id: number): Promise<IDriver> {
    return this.driversRepository.findOneOrFail({
      where: { id },
    });
  }

  async createDriver(createDriverInput: IDriverCreate): Promise<IDriver> {
    const newDriver = this.driversRepository.create(createDriverInput);
    return this.driversRepository.save(newDriver);
  }

  async findDrivers(carId: number): Promise<IDriver[]> {
    return this.driversRepository.find({
      where: { carId: carId },
    });
  }
}

// : Promise<any>
//   async deleteDrivers(carId: number) {
//     const driversToDelete = await this.driversRepository.find({
//       where: { carId: carId },
//     });
//     return await this.driversRepository.remove(driversToDelete);
//   }
// }
