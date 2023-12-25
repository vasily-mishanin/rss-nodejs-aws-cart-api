import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// import all entities here
// User, Cart, CartItem, Order
import { CartEntity } from './entities/Cart.entity';
import { CartItemEntity } from './entities/cart_item.entity';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/database/entities/*.entity{.ts,.js}'],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      CartEntity,
      CartItemEntity,
      OrderEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
