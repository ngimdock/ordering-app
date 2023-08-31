import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}
  createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request, {});
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
