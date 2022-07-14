import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Passport } from "passport";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { User } from './entities/user.entity';

@Module({
  imports: [
    Passport,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,],
  exports: [JwtModule, PassportModule, PassportModule]
})
export class UsersModule { }