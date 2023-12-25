import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CartEntity } from '../models/cart.entity';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  private get cartRepository(): Repository<CartEntity> {
    return this.entityManager.getRepository(CartEntity);
  }

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { user_id: userId } });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const id = v4();
    const created_at = new Date();
    const status = CartStatuses.ORDERED;

    const cart = this.cartRepository.create({
      id,
      user_id: userId,
      created_at,
      updated_at: created_at,
      status,
    });

    return this.cartRepository.save(cart);
  }

  // createByUserId(userId: string) {
  //   const id = v4();
  //   const userCart = {
  //     id,
  //     items: [],
  //     user_id: userId,
  //     created_at: new Date().toString(),
  //     updated_at: '',
  //     status: CartStatuses.ORDERED,
  //   };

  //   this.userCarts[userId] = userCart;

  //   return userCart;
  // }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string /*{ items }: Cart*/): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    //userCart.items = items;

    return this.cartRepository.save(userCart);
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
