import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  
  async loginUser(loginDto: LoginDto) {

    const { email, password } = loginDto;

    const user = await this.userService.findOneByFilter({ email });

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const { password: _, ...safeUser} = user;

    return {
      ...safeUser,
      token: this.generateJwt({
        email: user.email,
        id: user.id
      })
    }

  }

    private generateJwt(payload: JwtPayload) {
    //Generate JWT
    return this.jwtService.sign(payload);
  }


}
