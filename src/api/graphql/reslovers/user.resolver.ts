import { Query, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { IsAuthGuard } from 'src/domain/auth/guards/isAuth.guard';
import { IUser } from 'src/domain/user/interfaces/user.interfaces';
import { UserService } from 'src/domain/user/user.service';
import { UserModel } from '../commons/user.model';
import { CreateUserInput } from '../dto/create-user.input';
import { RolesEnum } from 'src/domain/authorization/roles.enum';
import { Roles } from 'src/domain/authorization/roles.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserModel)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<IUser> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserModel)
  findUser(@Args('username') username: string) {
    return this.userService.findUser(username);
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => [UserModel])
  findAllUsers(): Promise<IUser[]> {
    return this.userService.findAllUsers();
  }
}
