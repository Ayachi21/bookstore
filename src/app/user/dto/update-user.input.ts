import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose'; 

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  // We are using PartialType from @nestjs/graphql into the UpdateUserInput class to make 
  // sure all the fields that the CreateUserInput contains will be available here, but optional
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;
}
