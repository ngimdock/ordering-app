import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto';

@Injectable()
export class OrdersService {
  createOrder(request: CreateOrderRequest) {
    return request;
  }

  getHello(): string {
    return 'Hello World orders!!';
  }
}
