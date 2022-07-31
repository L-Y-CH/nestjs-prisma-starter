import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get('all')
    getAllUsers(){
        return this.usersService.getUsers();
    }

    @Post('create')
    createUser(@Body() newUser: CreateUserInput){
        let user = Object.assign(newUser, {role: Role.USER});
        return this.usersService.createUser(user);
    }
}
