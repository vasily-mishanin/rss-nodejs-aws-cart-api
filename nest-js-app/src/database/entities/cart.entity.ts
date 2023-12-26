import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartItemEntity } from './cart_item.entity';
import { CartStatuses } from 'src/cart';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({
    type: 'timestamp',
    default: new Date().toString(),
    nullable: false,
  })
  created_at: Date | string;

  @Column({ type: 'timestamp', default: '', nullable: false })
  updated_at: Date | string;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED', 'STATUS'],
    default: 'OPEN',
    nullable: false,
  })
  status: CartStatuses | string;

  @OneToMany(() => CartItemEntity, (cart_item) => cart_item.cart, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  cart_items: CartItemEntity[];
}
