import { ApiProperty } from '@nestjs/swagger';

export class User {
  /**
   * The firstName of the user
   * @example Louis
   */
  firstName: string;

  /**
   * The lastName of the user
   * @example rca
   */
  lastName: string;

  /**
   * The email of the user
   * @example rca@mail.com
   */
  email: string;

  /**
   * The password of the user
   * @example password
   */
  password: string;

  /**
   * The id of the user
   * @example 1
   */
  id: number;

  /**
   * The role of the user
   * @example ADMIN
   */
  role: ['ADMIN', 'USER'];
}
