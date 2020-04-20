import { Controller, Body, Post, Get, HttpException, HttpStatus} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { UserError } from "./exceptions/user.error";
import { BadRequestError } from "src/error/badRequestError";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() user: UserDto): Promise<void> {
        try {
            return this.userService.createUser(user);
        } catch(e) {
            if(e instanceof UserError) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal Server Error, Failed to create user', e);
        }
        
    }
    
    @Get()
    async getUser(@Body('uid') uid: string) {
        try {
            const userResponse = await this.userService.getUser(uid);
            if(userResponse != null) {
                return userResponse;
            } else {
                throw new UserError('User does not exists');
            }
        } catch(e) {
            if(e instanceof UserError) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal Server Error, Failed to get user', e);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}