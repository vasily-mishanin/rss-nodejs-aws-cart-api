import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('cart')
export class CartItemEntity {
  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  //   @OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
  //   items: CartItemEntity[];
}
