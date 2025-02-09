import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthenticationDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'email@email.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ example: '123456' })
    password: string;
}