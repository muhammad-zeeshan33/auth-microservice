import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: '', description: 'The email of the User' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '12345678', description: 'The password of the User' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
