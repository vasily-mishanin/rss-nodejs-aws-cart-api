import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  private orders: Record<string, Order> = {};

  async findById(orderId: string): Promise<OrderEntity> {
    //return this.orders[ orderId ];
    return await this.orderRepository.findOne({
      where: { id: orderId },
    });
  }

  create(data: any) {
    const id = v4();
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    this.orders[id] = order;

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }
}
