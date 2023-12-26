import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';
import { CreateCartDto } from '../dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  //private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string) {
    // return this.userCarts[userId];
    return await this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['cart_items'],
    });
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      user_id: userId,
      created_at: new Date().toString(),
      updated_at: '',
      status: CartStatuses.OPEN,
      cart_items: [],
    };

    // this.userCarts[userId] = userCart;
    // return userCart;
    try {
      await this.cartRepository.insert(userCart);
      return userCart;
    } catch (error) {
      return false;
    }
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    { cart_items }: CartEntity,
  ): Promise<CartEntity> {
    try {
      const cart = await this.findOrCreateByUserId(userId);

      if (cart) {
        cart.cart_items = cart_items;
        const updatedCart = await this.cartRepository.save(cart);
        return updatedCart;
      }
    } catch (error) {
      console.error('Cart-Service-updateByUserId');
      throw new Error('When updateByUserId');
    }
  }

  async removeByUserId(userId: string) {
    // this.userCarts[userId] = null;
    await this.cartRepository.delete({ user_id: userId });
  }
}
