import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/sigin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './role.enum';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signin(signinDto: SigninDto): Promise<{}> {

        try {
            let { email, password } = signinDto;


            let isExist = await this.userRepository.findOneBy({ email });

            if (isExist && bcrypt.compare(password, isExist.password)) {
                const payload = isExist.id;
                const access_token = await this.jwtService.sign({ payload });
                return { access_token: access_token };
            } else {
                throw new UnauthorizedException("Please check your login creds...")
            }

        } catch (error) {
            return error;
        }

    }

    async signup(createUserDto: CreateUserDto): Promise<User> {

        try {
            let { email, name, password } = createUserDto;
            let user = new User();
            user.email = email;
            user.name = name;
            user.roles = UserRole.USER;

            let isExist = await this.userRepository.findOneBy({ email });

            if (isExist) {
                throw new UnauthorizedException('user already exist');
            } else {
                let salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(password, salt);
                const newUser = await this.userRepository.save(user);
                console.log(user, newUser);
                return newUser;
            }
        } catch (error) {

            return error;
        }

    }

    async adminSignup(createAdminDto: CreateUserDto): Promise<User> {

        try {
            let { email, name, password } = createAdminDto;
            let user = new User();
            user.email = email;
            user.name = name;
            user.roles = UserRole.ADMIN;

            let isExist = await this.userRepository.findOneBy({ email });


            if (isExist) {
                throw new UnauthorizedException('user already exist');
            } else {
                let salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(password, salt);
                const newUser = await this.userRepository.save(user);
                console.log(user, newUser);
                return newUser;
            }
        } catch (error) {
            return error;
        }

    }


    async getUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({});
        } catch (error) {
            return error;
        }
    }


    async getUserById(id: string): Promise<User> {
        try {
            return await this.userRepository.findOneBy({ id });
        } catch (error) {
            return error;
        }
    }

    async updateUser(id: string, {email, name, password}) {
        console.log('before try catch bloc');
        try {
            console.log('inside try catch bloc');
            console.log('fetching user in the database')
            const user = await this.userRepository.findOneBy({ id });
            console.log('user fetched,: ', user);
            console.log('check if user exists');
            if (user) {
                console.log('inside if bloc');
                console.log('check if password is provided')
                
                console.log('before update query: ');
                const update = await this.userRepository.update(id, { email, name, password })
                console.log('update_result: ', update);
                console.log('fetch updated ressource by id and return')
                const updated = await this.userRepository.findOneBy({ id });
                console.log('updated ressource: ', updated);
                return updated;
            } else {
                console.log('user not found!')
                throw new BadRequestException('user not found!')
            }
        } catch (error) {
            throw new BadRequestException({error: error});
        }

    }

    async deleteUser(id: string): Promise<string> {
        try {
            await this.userRepository.delete({ id });
            return `Delete user ${id} successfuly`;
        } catch (error) {
            return error;
        }
    }

    async deleteUsers(): Promise<string> {
        try {
            await this.userRepository.delete({});
            return "Ressources Deleted Successfuly!";
        } catch (error) {
            return error;
        }
    }
}


