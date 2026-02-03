import { IsEmail, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @MaxLength(100)
    email: string;

    @MaxLength(100)
    @MinLength(6)
    password:string;
}
