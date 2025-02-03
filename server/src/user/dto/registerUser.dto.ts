import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name of the User',
    example: 'Richard',
  })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name of the User',
    example: 'Armstrong',
  })
  lastname: string;

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

  @IsNotEmpty()
  @ApiProperty({
    description: 'The role of the User',
    example: 'ADMIN',
  })
  role: ['ADMIN', 'USER'];
}
