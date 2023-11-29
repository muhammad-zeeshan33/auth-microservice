import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiOperation } from '@nestjs/swagger';
import { LoginDto as LoginDTO } from 'src/common/dtos/loginDto.dto';
import { ProfileDto } from 'src/common/dtos/ProfileDto.dto';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from 'src/common/dtos/updatePasswordDto.dto';
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
      id: user.id,
      name: user.name,
      ...token,
    };
  }

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
      id: user.id,
      name: user.name,
      ...token,
    };
  }

  @ApiOperation({ summary: 'Validate Token' })
  @ApiParam({ name: 'token', type: String })
  @Post('validate-token')
  async validate(@Body() body: any) {
    const user = await this.authService.validateUser(body);
    if (typeof user === 'string') {
      return false;
    }
    return true;
  }

  @ApiOperation({ summary: 'Update Password' })
  @ApiBody({ type: UpdatePasswordDto })
  @Post('updatePassword')
  async updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    body.email = req.user.username;
    const user = await this.authService.updatePassword(body);
    if (typeof user === 'string') {
      return user;
    }
    return user;
  }
}
