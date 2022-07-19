import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUser, IUserCreate } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from '../authorization/roles.enum';

// регистрация
// хешировать пароль (bcrypt)

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(input: IUserCreate): Promise<IUser> {
    const { password } = input;
    const hashPassword = await bcrypt.hashSync(password, 7);
    input.password = hashPassword;
    const user = await this.userRepository.create(input);
    user.roles = [RolesEnum.ADMIN];
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  public async findUser(username: string): Promise<IUser | undefined> {
    const user = await this.userRepository.findOneOrFail({
      where: { username: username },
    });
    return user;
  }

  public async findAllUsers(): Promise<IUser[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }
}
