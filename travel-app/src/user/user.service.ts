import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepositary } from './user.repositary';
import { UserError } from './exceptions/user.error';

@Injectable()
export class UserService {
  constructor(private userRepositary: UserRepositary) {}

  async createUser(userDto: UserDto): Promise<void> {
    if(await this.userRepositary.getUser(userDto.uid) == null) {
        return await this.userRepositary.addOrUpdate(userDto);
    }
    else {
        throw new UserError("User already exists");
    }
    
  }

  async getUser(uid: string): Promise<UserDto> {
      return await this.userRepositary.getUser(uid);
  }
}