import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    this.billingService.bill(data);
  }
}
