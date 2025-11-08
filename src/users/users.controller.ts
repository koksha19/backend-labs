import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  create(@Body('name') name: string) {
    return this.usersService.create(name);
  }

  @Get('user/:id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    this.usersService.remove(Number(id));
    return { success: true };
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }
}
