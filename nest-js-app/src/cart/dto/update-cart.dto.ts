import { CartEntity } from 'src/database/entities/cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CartStatuses } from '../models';

export class UpdateCartDto {
  @ApiProperty()
  id: string;
  user_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  status: CartStatuses | string;
  cart_items: { cart_id: string; product_id: string; count: number }[];
}
