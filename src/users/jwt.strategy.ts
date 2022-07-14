import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UserService) {
        super({
            secretOrKey: 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    // at this level we know that the user is valid.

    async validate(payload: string) {
        let id = '';
        for (const [key, val] of Object.entries(payload)) {
            const arr = [];
            arr.push(val);
            arr.splice(1, 2);
            id = arr[0];

            payload = id;
            try {
                let user = await this.usersService.getUserById(payload);
                if (!user) {
                    throw new UnauthorizedException("");
                }

                /* when we return a user, passport is going to inject it into the response object
                 of our controller so that we always have access to it */

                return user;
            } catch (error) {
                return error;
            }
        }

    }

}