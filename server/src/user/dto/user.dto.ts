import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsDate,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type Role = 'ADMIN' | 'USER';

export class UserDto {
  @IsString()
  @ApiProperty({
    description: 'The id of the User',
    example: '5fe8ba10-c291-48d0-ae67-41a99aa6924a',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name of the User',
    example: 'Richard',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name of the User',
    example: 'Armstrong',
  })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the User',
    example: 'r.armstrong@mail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the User',
    example: 'password',
  })
  password: string;

  @IsDate()
  @ApiProperty({
    description: 'The createdAt date of the User',
    example: '2021-10-05T00:00:00.000Z',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'The updatedAt date of the User',
    example: '2021-10-05T00:00:00.000Z',
  })
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The role of the User',
    example: 'ADMIN',
  })
  role: Role;
}
