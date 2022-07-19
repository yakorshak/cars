import { Int, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  roles: string[];
}
