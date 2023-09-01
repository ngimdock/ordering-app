import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AbtractDocument {
  @Prop()
  id: string;
}
