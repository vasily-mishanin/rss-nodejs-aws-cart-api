import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './services';
import { CartModule } from 'src/cart/cart.module';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
      imports: [CartModule],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
