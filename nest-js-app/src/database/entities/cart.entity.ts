import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
//import { CartItemEntity } from './cart-item.entity'; // Assuming you have a CartItemEntity

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
  created_at: Date;

  @Column({ type: 'timestamp', default: '', nullable: false })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    default: 'OPEN',
    nullable: false,
  })
  status: string;

  //   @OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
  //   items: CartItemEntity[];
}
