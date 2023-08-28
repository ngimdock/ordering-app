import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // createOrder(@Body() request: CreateOrderRequest) {
  //   return this.ordersService.createOrder(request);
  // }

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }
}
