import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
