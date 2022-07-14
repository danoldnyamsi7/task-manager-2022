import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SigninDto } from './dto/sigin.dto';
import { Roles } from './role.decorator';
import { GetUser } from './getUser.decorator';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async createUser(@Body() signupDto: CreateUserDto): Promise<Object> {
    try {
      const user = await this.userService.signup(signupDto);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('signupAdmin')
  async createAdmin(@Body() signupAdminDto: CreateUserDto): Promise<{}> {
    try {
      const user = await this.userService.adminSignup(signupAdminDto);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async siginUser(@Body() signinDto: SigninDto): Promise<{}> {
    try {
      const userToken = await this.userService.signin(signinDto);
      return userToken;
    } catch (error) {
      return error;
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  @Roles('admin')
  async getUsers(): Promise<User[]> {
    try {
      return this.userService.getUsers();

    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string): Promise<User> {
    
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  async updateUser(@Param('id') id: string, @Body('name') name?: string, @Body('password') password?: string, @Body('email') email?: string) {
    try {
      return await this.userService.updateUser(id, {email, name, password});
    } catch (error) {
      throw new BadRequestException('could not fetch: ', error);
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  async deleteTasks(): Promise<{ message: string }> {

    try {
      await this.userService.deleteUsers();
      return { message: `users was deleted successfuly!` }
    } catch (error) {
      return error;
    }

  }


  @Delete(':id')
  @UseGuards(AuthGuard())
  @Roles('ADMIN')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {

    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        await this.userService.deleteUser(id);
        return { message: `user: ${id} was deleted successfuly!` }
      } else {
        throw new BadRequestException({ message: 'user not found!' })
      }
    } catch (error) {
      return error;
    }

  }

}
