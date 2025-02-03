import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the User',
    example: 'r.armstrong@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the User',
    example: 'password',
  })
  password: string;
}
