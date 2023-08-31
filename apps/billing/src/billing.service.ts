import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private logger = new Logger(BillingService.name);

  bill(data: any) {
    this.logger.debug('Billing...', data);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
