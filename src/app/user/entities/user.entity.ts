import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class UserDocument {
  // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
  // In other words, that decorator isn't necessary for Rest APIs

  // @Field(() => String)
  // _id: MongooSchema.Types.ObjectId;

  // Add user properties
  // @Field(() => String)
  @Prop()
  name: string;
  //@Prop() decorator to define fields in a data module. This decorator can take several properties, 
  //such as whether a field is required or unique. 
  // For example, we set the email field as unique to prevent duplicate accounts
  // @field () This will help generate our schema file and indicate to our API that the specific field is a GraphQL one

  // @Field(() => String)
  @Prop({ unique: true })
  email: string;

  // @Field(() => String)
  @Prop()
  password: string;

  // @Field(() => String)
  @Prop()
  address: string;

  // TODO: ADD RELATIONSHIP TO THE BOOK MODEL
}

// export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(UserDocument);

@ObjectType()
export class User {
  @Field()
  _id:string
  @Field()
  name:string
  @Field()
  email:string
  @Field()
  password:string
  @Field()
  address:string

}