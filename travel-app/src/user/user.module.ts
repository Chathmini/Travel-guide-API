import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositary } from './user.repositary';
//import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepositary],
})
export class UserModule {}
