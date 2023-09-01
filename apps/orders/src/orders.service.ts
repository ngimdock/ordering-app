import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto';
import { OrderRepository } from './order.repository';
import { BILLING_SERVIVE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVIVE) private readonly billingClient: ClientProxy,
  ) {}
  async createOrder(request: CreateOrderRequest) {
    const session = await this.orderRepository.startTransaction();

    try {
      const order = await this.orderRepository.create(request, { session });

      await lastValueFrom(this.billingClient.emit('order_created', { order }));

      session.commitTransaction();

      return order;
    } catch (err) {
      console.log({ err });

      session.abortTransaction();

      throw err;
    }
  }

  getOrders() {
    return this.orderRepository.find({});
  }

  async deleteOrder(orderId: string) {
    return this.orderRepository.delete(orderId);
  }
}
