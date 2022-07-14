import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";



export class CreateUserDto {
    @IsString()
    @MaxLength(25)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password: string;


}
