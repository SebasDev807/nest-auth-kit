import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  loginUser(@Body() LoginDto: LoginDto) {
    return this.authService.loginUser(LoginDto);
  }

}
