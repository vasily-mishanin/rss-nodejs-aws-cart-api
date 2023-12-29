import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_item')
export class CartItemEntity {
  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @PrimaryColumn({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cart_items)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: CartEntity;
}
