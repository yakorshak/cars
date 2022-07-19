import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './domain/car/car.module';
import { GraphqlModule } from './api/graphql/graphql.module';
import { ShopModule } from './domain/shop/shop.module';
import { DriverModule } from './domain/driver/driver.module';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { AuthorizationModule } from './domain/authorization/authorization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_SERVER || '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mysql',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    CarModule,
    DriverModule,
    GraphqlModule,
    ShopModule,
    AuthModule,
    UserModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
