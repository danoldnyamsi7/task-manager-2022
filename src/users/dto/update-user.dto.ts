import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MaxLength(25)
    name?: string;

    // @IsNotEmpty()
    @IsEmail()
    @IsString()
    email?: string;

    // @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password?: string;
}
