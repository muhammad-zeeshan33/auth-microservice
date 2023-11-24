import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiOperation } from '@nestjs/swagger';
import { LoginDto as LoginDTO } from 'src/common/dtos/loginDto.dto';
import { ProfileDto } from 'src/common/dtos/ProfileDto.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login with username & password' })
  @ApiBody({ type: LoginDTO })
  @Post('login')
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.validateUser(body);
    if (typeof user === 'string') {
      return user;
    }
    const token = await this.authService.generateToken(user);

    return {
      ...user,
      ...token,
    };
  }

  // Register User
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: ProfileDto })
  @Post('register')
  async signup(@Body() body: ProfileDto) {
    const user = await this.authService.register(body);
    if (typeof user === 'string') {
      return user;
    }
    const token = await this.authService.generateToken(user);

    return {
      ...user,
      ...token,
    };
  }
}
