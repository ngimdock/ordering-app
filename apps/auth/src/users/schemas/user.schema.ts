import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbtractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbtractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
