import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from 'src/common/dtos/ProfileDto.dto';
import { DataService } from 'src/common/http/data.service';
import { LoginDto as LoginDTO } from 'src/common/dtos/loginDto.dto';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _dataService: DataService,
  ) {}

  private userServiceBaseUrl = process.env.USER_SERVICE_BASE_URL;

  async generateToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: LoginDTO) {
    const user: ProfileDto = await firstValueFrom(
      this._dataService.get(
        `${this.userServiceBaseUrl}/user/findByEmail/${payload.email}`,
      ),
    );
    if (typeof user == 'string') {
      return 'User does not exist with this username';
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (isMatch) {
      return user;
    }
    return 'Password is incorrect';
  }

  async register(payload: ProfileDto): Promise<any> {
    payload.password = await this.hashPassword(payload.password);
    const user = await firstValueFrom(
      this._dataService.post(`${this.userServiceBaseUrl}/user`, payload),
    );
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
