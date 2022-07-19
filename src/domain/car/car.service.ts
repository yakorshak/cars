import { Injectable } from '@nestjs/common';
import { Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/domain/car/entities/car.entity';
import { Repository } from 'typeorm';
import { DriverService } from '../driver/driver.service';
import { IDriver } from '../driver/interfaces/driver.interfaces';
import { ICar, ICarCreate, ICarUpdateData } from './interfaces/car.interfaces';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private carsRepository: Repository<CarEntity>,
    private driversService: DriverService,
  ) {}

  // async when there is few requests into DB, or while each request?

  async findAll(): Promise<ICar[]> {
    return this.carsRepository.find();
  }

  async createCar(createCarInput: ICarCreate): Promise<ICar> {
    const newCar = this.carsRepository.create(createCarInput);
    return this.carsRepository.save(newCar);
  }

  // here was id
  async getCar(id: number): Promise<ICar> {
    return this.carsRepository.findOneOrFail({
      where: { id },
    });
  }

  async getDrivers(
    @Args('carId', { type: () => Int }) carId,
  ): Promise<IDriver[]> {
    return this.driversService.findDrivers(carId);
  }

  async updateCar(id: number, updateCarInput: ICarUpdateData): Promise<ICar> {
    const updatedCar = await this.carsRepository.findOneOrFail({
      where: { id },
    });
    Object.assign(updatedCar, updateCarInput);
    return await this.carsRepository.save(updatedCar);
  }

  // : Promise<any> ??
  // : Promise<Car>
  async deleteCar(id: number) {
    const carToDelete = await this.carsRepository.findOneOrFail({
      where: { id },
    });
    // cascade?
    // if (carToDelete.drivers) {
    //   this.driversService.deleteDrivers(id);
    // }
    return await this.carsRepository.remove(carToDelete);
  }
}
