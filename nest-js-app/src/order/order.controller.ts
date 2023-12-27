import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from './services';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from '../cart';
import { ApiTags } from '@nestjs/swagger';
import { OrderEntity } from 'src/database/entities/order.entity';

@ApiTags('Order')
@Controller('api/profile/order')
export class OrderController {
  constructor(
    // private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async getOrder(@Req() req: AppRequest) {
    const order = await this.orderService.findById(
      //getUserIdFromRequest(req),
      'f094f18f-6fb6-4887-9edd-92d3d7eeceed',
    );

    if (order) {
      return {
        statusCode: HttpStatus.OK,
        message: 'getOrder - OK',
        //data: { cart, total: calculateCartTotal(cart) },
        data: { order },
      };
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'getOrder - FAIL',
      //data: { cart, total: calculateCartTotal(cart) },
    };
  }

  // // @UseGuards(JwtAuthGuard)
  // // @UseGuards(BasicAuthGuard)
  // @Put()
  // async updateUserCart(@Req() req: AppRequest, @Body() body: CartEntity) {
  //   // TODO: validate body payload...
  //   const cart = await this.cartService.updateByUserId(
  //     getUserIdFromRequest(req),
  //     body,
  //   );

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: {
  //       cart,
  //       // total: calculateCartTotal(cart),
  //     },
  //   };
  // }

  // // @UseGuards(JwtAuthGuard)
  // // @UseGuards(BasicAuthGuard)
  // @Delete()
  // clearUserCart(@Req() req: AppRequest) {
  //   this.cartService.removeByUserId(getUserIdFromRequest(req));

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //   };
  // }

  // // @UseGuards(JwtAuthGuard)
  // // @UseGuards(BasicAuthGuard)
  // @Post('checkout')
  // async checkout(@Req() req: AppRequest, @Body() body) {
  //   const userId = getUserIdFromRequest(req);
  //   const cart = await this.cartService.findByUserId(userId);

  //   if (!(cart && cart.cart_items.length)) {
  //     const statusCode = HttpStatus.BAD_REQUEST;
  //     req.statusCode = statusCode;

  //     return {
  //       statusCode,
  //       message: 'Cart is empty',
  //     };
  //   }

  //   const { id: cartId, cart_items } = cart;
  //   // const total = calculateCartTotal(cart);
  //   const order = this.orderService.create({
  //     ...body, // TODO: validate and pick only necessary data
  //     userId,
  //     cartId,
  //     cart_items,
  //     //total,
  //   });
  //   this.cartService.removeByUserId(userId);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: { order },
  //   };
  // }
}
