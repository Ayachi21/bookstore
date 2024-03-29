import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Schema as MongooSchema } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel :Model<UserDocument>,
  ) {}
  createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  updateUser(id: MongooSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id,updateUserInput,{new:true});
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({_id:id});
  }
}
