import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';
export class CreateUserDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'adminpassword' })
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER, required: false })
  @IsEnum(UserRole, { message: 'Role must be one of user, admin, writter' })
  role?: UserRole;

  @ApiProperty({ example: 'Admin', required: true })
  name?: string;

  @ApiProperty({ example: 'https://', required: true })
  avatarURL?: string;
}
