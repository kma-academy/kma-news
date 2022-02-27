import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'adminpassword' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Admin', required: false })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'https://placedog.net/500/500/?id=6',
    required: false,
  })
  @IsString()
  avatarURL: string;
}
